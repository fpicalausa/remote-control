import atexit
import logging
import time

try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

GPIO14 = 14

SERIAL_START_HOLD = 18000000
SERIAL_RESPONSE_WAIT = 40000
SERIAL_RESPONSE_MARK = 80000
SERIAL_BIT_MARK = 50000
SERIAL_ONE_MARK = 30000
SERIAL_ZERO_MARK = 70000
SERIAL_NO_MORE_DATA = 200000

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
        self.changes = []

    def setup(self):
        self.pi.set_pull_up_down(self.pin, pigpio.PUD_UP)
        self.pi.set_mode(self.pin, pigpio.INPUT)

        # skip any communication we might have triggered
        time.sleep(0.1)

    def _on_edge(self, gpio, level, tick):
        self.changes.append((level, tick))

    def read(self):
        last_transition = time.time_ns()

        self.changes = []
        self.pi.set_mode(self.pin, pigpio.OUTPUT)
        self.pi.write(self.pin, pigpio.LOW)
        while (time.time_ns() - last_transition < SERIAL_START_HOLD):
            continue
        self.pi.set_mode(self.pin, pigpio.IN)
        cb = self.pi.callback(self.pin, pigpio.EITHER_EDGE, self._on_edge)
        self.pi.set_watchdog(self.pin, 1)

        while (self.changes and self.changes[-1][0] != pigpio.TIMEOUT):
            continue
        self.pi.set_watchdog(self.pin, 0)
        cb.cancel()

        print(self.changes)
        return []


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
bits = transport.read()

if len(bits) != 40:
    raise ValueError("Bad bits array: length is " + str(len(bits)))

for i in range(0, len(bits), 8):
    print(bits[i:i+8])
    byte = 0
    for bit in bits[i:i+8]:
        byte = (byte << 1) | bit
    print(byte)


exit(1)
