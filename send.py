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
        self.log.append( (pin, 'set', level, time.perf_counter_ns()) )

    def hardware_PWM(self, pin, freq, duty):
        self.log.append( (pin, 'pwm', freq, time.perf_counter_ns()) )

    def printout(self):
        p = self.log[0][3]
        st = 0
        # for pin, cmd, lvl, ns in self.log:
        #    print(pin, cmd, lvl, ns, (ns-p) // 1000)
        #    p = ns
        for _, cmd, lvl, ns in self.log:
            gap = (ns-p) // 1000
            p = ns
            on = cmd == 'pwm'
            off = cmd == 'set' and lvl == 0

            if not on and not off:
                print("Unexpected state!")
            nst = 1 if on else 0
            print(st, '->', nst, gap)
            st=nst


pi = FakePi()
io = IO(pi, 18, 33000, 1000000.0 / 2)
def cleanup():
    io.off()
atexit.register(cleanup)

transport = Transport(io, framing)

frame = framing.frame()
frame.add_bytes(
    0b00101000, 0b11000110, 0b00000000, 
    0b00001000, 0b00001000, 0b01000000
)

transport.send_frame(frame)

pi.printout()