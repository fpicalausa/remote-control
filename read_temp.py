import atexit
import logging
import time

try:
    import RPi.GPIO as GPIO
except:
    logging.warning("Failed to import pigpio.")
    GPIO = None

GPIO14 = 14

SERIAL_START_HOLD = 18000000
SERIAL_RESPONSE_WAIT = 40000
SERIAL_RESPONSE_MARK = 80000
SERIAL_BIT_MARK = 50000
SERIAL_ONE_MARK = 30000
SERIAL_ZERO_MARK = 70000
SERIAL_NO_MORE_DATA = 100000

STATE_INIT = 0
STATE_SEND_START = 1
STATE_WAIT_RESPONSE = 2
STATE_RESPONSE_LO = 3
STATE_RESPONSE_HI = 4
STATE_BIT_START = 5
STATE_BIT_DATA = 6
STATE_END = 7


class SingleWireSerialTransport:
    def __init__(self, pi, pin):
        self.pi = pi
        self.pin = pin

    def setup(self):
        self.pi.setup(self.pin, GPIO.IN, GPIO.PUD_UP)

        # skip any communication we might have triggered
        time.sleep(0.1)

    def _transition(self, target, current_state, next_state, last_transition, timeout):
        value = self.pi.input(self.pin)
        if value == target:
            return next_state
        elif time.time_ns() - last_transition > timeout * 20:
            raise IOError('Timed out in state ' + str(current_state))

        return current_state

    def read(self):
        state = STATE_INIT
        old_state = STATE_END
        last_transition = 0
        bits_length = []

        while state != STATE_END:
            if old_state != state:
                last_transition = time.time_ns()
            old_state = state

            if state == STATE_INIT:
                self.pi.setup(self.pin, GPIO.OUT)
                self.pi.output(self.pin, GPIO.LOW)
                state = STATE_SEND_START
            elif state == STATE_SEND_START:
                if (time.time_ns() - last_transition > SERIAL_START_HOLD):
                    self.pi.set_mode(self.pin, GPIO.IN)
                    state = STATE_WAIT_RESPONSE
            elif state == STATE_WAIT_RESPONSE:
                state = self._transition(
                    0, state, STATE_RESPONSE_LO, last_transition, SERIAL_RESPONSE_WAIT)
            elif state == STATE_RESPONSE_LO:
                state = self._transition(
                    1, state, STATE_RESPONSE_HI, last_transition, SERIAL_RESPONSE_MARK)
            elif state == STATE_RESPONSE_HI:
                state = self._transition(
                    0, state, STATE_BIT_START, last_transition, SERIAL_RESPONSE_MARK)
            elif state == STATE_BIT_START:
                state = self._transition(
                    1, state, STATE_BIT_DATA, last_transition, SERIAL_BIT_MARK)
            elif state == STATE_BIT_DATA:
                value = self.pi.read(self.pin)

                if value == 0:
                    length = time.time_ns() - last_transition
                    bits_length.append(length)
                    state = STATE_BIT_START
                elif time.time_ns() - last_transition > SERIAL_NO_MORE_DATA:
                    state = STATE_END

        print(min(bits_length))
        print(max(bits_length))
        print(str(bits_length))


def make_pigpio_transport():
    GPIO.setmode(GPIO.BCM)

    def cleanup():
        GPIO.cleanup()

    atexit.register(cleanup)
    return SingleWireSerialTransport(GPIO, GPIO14)


if not GPIO:
    exit(1)

transport = make_pigpio_transport()
transport.setup()
transport.read()

exit(1)
