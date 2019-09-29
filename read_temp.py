import atexit
import logging
import time
try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

GPIO14 = 14

SERIAL_START_LO = 18000000
SERIAL_RESPONSE_WAIT = 4000
SERIAL_RESPONSE_MARK = 8000
SERIAL_BIT_MARK = 5000
SERIAL_ONE_MARK = 3000
SERIAL_ZERO_MARK = 7000
SERIAL_NO_MORE_DATA = 10000

STATE_INIT = 0
STATE_WAIT_RESPONSE = 1
STATE_RESPONSE_LO = 2
STATE_RESPONSE_HI = 3
STATE_BIT_START = 4
STATE_BIT_DATA = 5
STATE_END = 6

class SingleWireSerialTransport:
    def __init__(self, pi, pin):
        self.pi = pi
        self.pin = pin

    def setup(self):
        self.pi.set_pull_up_down(self.pin, pigpio.PUD_UP)
        self.pi.set_mode(self.pin, pigpio.INPUT)

        #skip any communication we might have triggered
        time.sleep(0.1)

    def _transition(self, target, current_state, next_state, last_transition, timeout):
        value = self.pi.read(self.pin)
        if value == target:
            state = next_state
        elif time.time_ns() - last_transition > timeout * 20:
            raise IOError('Timed out in state ' + str(current_state))

        return current_state

    def read(self):
        state = STATE_INIT
        old_state = STATE_END
        last_transition = 0
        bits_lengths = []

        while state != STATE_END:
            if old_state != state:
                print("State: " + str(state))
                last_transition = time.time_ns()
            old_state = state

            if state == STATE_INIT:
                self.pi.set_mode(self.pin, pigpio.OUTPUT)
                self.pi.write(self.pin, pigpio.LOW)
                if (time.time_ns() - last_transition > SERIAL_START_LO):
                    state = STATE_WAIT_RESPONSE
                self.pi.write(self.pin, pigpio.HIGH)
                self.pi.set_mode(self.pin, pigpio.INPUT)
            elif state == STATE_WAIT_RESPONSE:
                state = self._transition(0, state, STATE_RESPONSE_LO, last_transition, SERIAL_RESPONSE_WAIT)
            elif state == STATE_RESPONSE_LO:
                state = self._transition(1, state, STATE_RESPONSE_HI, last_transition, SERIAL_RESPONSE_MARK)
            elif state == STATE_RESPONSE_LO:
                state = self._transition(0, state, STATE_BIT_START, last_transition, SERIAL_RESPONSE_MARK)
            elif state == STATE_BIT_START:
                state = self._transition(1, state, STATE_BIT_DATA, last_transition, SERIAL_BIT_MARK)
            elif state == STATE_BIT_DATA:
                value = self.pi.read(self.pin)

                if value == 0:
                    length = time.time_ns() - last_transition
                    bit_length.append(length)
                    state = STATE_BIT_DATA
                elif time.time_ns() - last_transition > SERIAL_NO_MORE_DATA:
                    state = STATE_END

        print(min(bit_length))
        print(max(bit_length))
        print(str(bit_length))


def make_pigpio_transport():
    pi = pigpio.pi()
    if not pi.connected:
        return None

    def cleanup():
        pi.stop()

    atexit.register(cleanup)
    return SingleWireSerialTransport(pi, GPIO14)


if not pigpio:
    exit(1)

transport = make_pigpio_transport()
transport.setup()
transport.read()
