import sys
import atexit
import time
import logging
from ir_frame import IRFrame
from ir_modulation import IRModulation
from ir_transport import ModulatedPinTransport, FakeTransport, OnePinTransport
from fujitsu_remote import FujitsuRemote

try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

GPIO18 = 18 # has PWM0 capability
GPIO23 = 23


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

transport = FakeTransport()

def make_pigpio_transport():
    pi = pigpio.pi()
    if not pi.connected:
        return None

    def cleanup():
        pi.write(GPIO18, 0)
        pi.write(GPIO23, 0)
        pi.stop()

    atexit.register(cleanup)

    return OnePinTransport(pi, GPIO18, 26, modulation)
    #return ModulatedPinTransport(pi, GPIO18, GPIO23, 38000, modulation)

if pigpio:
    transport = make_pigpio_transport()

if not transport:
    logging.warning("Failed to create transport. Aborting.")
    exit(0)

def send_command(command):
    print(command)
    frame = IRFrame()
    frame.add_bytes(command.to_bytes())
    transport.send_frame(frame)

remote = FujitsuRemote(send_command)

remote.cooler(25)
