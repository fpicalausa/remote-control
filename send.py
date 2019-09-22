import sys
import atexit
import time
import logging
from ir_frame import IRFrame
from ir_modulation import IRModulation
from ir_transport import ModulatedPinTransport, FakeTransport
from fujitsu_remote import FujitsuRemote

try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

PWM0 = 18
GPIO23 = 23


modulation = IRModulation(
    header_pulse=3338,
    header_space=1599,
    one_pulse=468,
    one_space=1196,
    zero_pulse=468,
    zero_space=376,
    trailer_pulse=468,
    trailer_space=305
)

transport = FakeTransport()

if pigpio:
    pi = pigpio.pi()

    def cleanup():
        pi.write(PWM0, 0)
        pi.write(GPIO23, 0)
        pi.stop()
        pass

    if not pi:
        exit(0)

    #transport = OnePinTransport(pi, PWM0, 26, modulation)
    transport = ModulatedPinTransport(pi, PWM0, GPIO23, 38000, modulation)

    atexit.register(cleanup)

def send_command(command):
    print(command)
    frame = IRFrame()
    frame.add_bytes(command.to_bytes())
    transport.send_frame(frame)

remote = FujitsuRemote(send_command)

remote.cooler(25)