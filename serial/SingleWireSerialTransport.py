import logging
try:
    import pigpio
except:
    pigpio = None
    logging.warning(
        "Unable to import pigpio (is it installed?). Some transport won't be available.")

import time


SERIAL_START_HOLD = 18000000  # ns
SERIAL_NO_MORE_DATA = 1  # ms

STATE_WAIT_RESPONSE = 0
STATE_RESPONSE_LO = 1
STATE_RESPONSE_HI = 2
STATE_BIT_START = 3
STATE_BIT_DATA = 4
STATE_END = 5


class SingleWireSerialTransport:
    def __init__(self, pi, pin):
        self.pi = pi
        self.pin = pin
        self.changes = []

    def setup(self):
        self.pi.set_pull_up_down(self.pin, pigpio.PUD_UP)
        self.pi.set_mode(self.pin, pigpio.INPUT)

        # skip any communication we might have triggered
        time.sleep(0.1)

    def _on_edge(self, gpio, level, tick):
        self.changes.append((level, tick))

    def _transition(self, actual, expected, next_state):
        if (actual == 2):
            raise ValueError("Timed out while reading")
        if (actual != expected):
            raise ValueError("Unexpected level: " + str(actual))

        return next_state

    def _do_read(self):
        last_transition = time.time_ns()
        self.changes = []
        self.pi.set_mode(self.pin, pigpio.OUTPUT)
        self.pi.write(self.pin, pigpio.LOW)
        while (time.time_ns() - last_transition < SERIAL_START_HOLD):
            continue
        self.pi.set_mode(self.pin, pigpio.INPUT)
        cb = self.pi.callback(self.pin, pigpio.EITHER_EDGE, self._on_edge)
        self.pi.set_watchdog(self.pin, SERIAL_NO_MORE_DATA)

        while (len(self.changes) == 0 or self.changes[-1][0] != pigpio.TIMEOUT):
            continue
        self.pi.set_watchdog(self.pin, 0)
        cb.cancel()

    def _extract_timings(self):
        state = STATE_WAIT_RESPONSE
        last_tick = self.changes[0][1]
        bits_length = []
        for (level, tick) in self.changes:
            if state == STATE_WAIT_RESPONSE:
                state = self._transition(level, 0, STATE_RESPONSE_LO)
            elif state == STATE_RESPONSE_LO:
                state = self._transition(level, 1, STATE_RESPONSE_HI)
            elif state == STATE_RESPONSE_HI:
                state = self._transition(level, 0, STATE_BIT_START)
            elif state == STATE_BIT_START:
                state = self._transition(level, 1, STATE_BIT_DATA)
            elif state == STATE_BIT_DATA:
                if (level == 2):
                    state = STATE_END
                    continue
                if (level == 1):
                    raise ValueError("Unexpected level: 1")

                state = STATE_BIT_START

                if last_tick < tick:
                    length = tick - last_tick
                else:
                    length = tick - (last_tick - 4294967295)
                bits_length.append(length)

            last_tick = tick
        return bits_length

    def read(self):
        self._do_read()
        timings = self._extract_timings()

        mid = (min(timings) + max(timings)) / 2
        return [0 if length < mid else 1 for length in timings]
