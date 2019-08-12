import sys
import atexit
import time
# import pigpio
from ir_control import IO
from ir_framing import IRFraming
from ir_transport import Transport


framing = IRFraming(
    header_pulse=3350,
    header_space=1590,
    one_pulse=470,
    one_space=1190,
    zero_pulse=470,
    zero_space=375
)

# pi = pigpio.pi
class FakePi:
    def __init__(self):
        self.log = []

    def write(self, pin, level):
        self.log.append( (pin, level, time.perf_counter_ns()) )

    def hardware_PWM(self, pin, freq, duty):
        self.log.append( (pin, freq, time.perf_counter_ns()) )

    def printout(self):
        p = self.log[0][2]
        for pin, lvl, ns in self.log:
            print(pin, lvl, ns, (ns-p) // 1000)
            p = ns

pi = FakePi()
io = IO(pi, 18, 33000, 1000000.0 / 2)
def cleanup():
    io.off()
atexit.register(cleanup)

transport = Transport(io, framing)

frame = framing.frame()
frame.add_bits(0b0100, 4)

transport.send_frame(frame)
transport.send_frame(frame)
transport.send_frame(frame)
transport.send_frame(frame)
transport.send_frame(frame)
transport.send_frame(frame)

pi.printout()