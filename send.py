import sys
import atexit
import time
import pigpio
from ir_framing import IRFraming
from ir_transport import ModulatedPinTransport, OnePinTransport

PWM0 = 18
GPIO23 = 23


framing = IRFraming(
    header_pulse=3338,
    header_space=1599,
    one_pulse=468,
    one_space=1196,
    zero_pulse=468,
    zero_space=376,
    trailer_pulse=468,
    trailer_space=305
)

pi = pigpio.pi()

if not pi:
    exit(0)

def cleanup():
    #pi.hardware_PWM(PWM0, 0, 0)
    pi.write(PWM0, 0)
    pi.write(GPIO23, 0)
    pi.stop()


atexit.register(cleanup)

# Send a few pulse to test that the electronics is still working
# pi.hardware_PWM(PWM0, 38000, 250000)
# 
# for i in range(0, 5):
#     start = time.clock_gettime(time.CLOCK_MONOTONIC_RAW)
#     while (time.clock_gettime(time.CLOCK_MONOTONIC_RAW) - start < 0.00048):
#         continue
#     pi.hardware_PWM(PWM0, 0, 0)
# 
#     start = time.clock_gettime(time.CLOCK_MONOTONIC_RAW)
#     while (time.clock_gettime(time.CLOCK_MONOTONIC_RAW) - start < 0.0012):
#         continue

transport = OnePinTransport(pi, PWM0, 26, framing)
#transport = ModulatedPinTransport(pi, PWM0, GPIO23, 38000, framing)

frame = framing.frame_from_bytes(
    0b00101000, 0b11000110, 0b00000000,
    0b00001000, 0b00001000, 0b01000000
)

frame2 = framing.frame_from_bytes(
    0b00101000, 0b11000110, 0b00000000, 0b00001000, 0b00001000,
    0b00111111, 0b00010000, 0b00001100, 0b00000110, 0b10000000,
    0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b11110110
)

frame3 = framing.frame_from_bytes(
    0b00101000, 0b11000110, 0b00000000, 0b00001000, 0b00001000,
    0b00111111, 0b00010000, 0b00001100, 0b10001110, 0b10000000,
    0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b01111010
)


transport.send_frame(frame3)
