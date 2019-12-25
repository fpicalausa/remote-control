from ir import IRModulation, OnePinTransport
import logging
import atexit

GPIO18 = 18

try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

modulation = IRModulation(
    header_pulse=3338,
    header_space=1599,
    one_pulse=474,
    one_space=1196,
    zero_pulse=474,
    zero_space=376,
    trailer_pulse=474,
    trailer_space=305
)


def make_pigpio_pi():
    pi = pigpio.pi()
    if not pi.connected:
        return None

    def cleanup():
        pi.write(GPIO18, 0)
        pi.stop()

    atexit.register(cleanup)
    return pi


pi = None
if pigpio:
    pi = make_pigpio_pi()

if not pi:
    logging.warning("Unable to connect to pigpio. Aborting.")
    transport = None
else:
    transport = OnePinTransport(pi, GPIO18, 26, modulation)
