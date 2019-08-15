import time

class IO:
    def __init__(self, pi, pin, f, duty_cycle):
        self.pin = pin
        self.f = f
        self.duty_cycle = duty_cycle
        self.pi = pi

    def off(self):
        self.pi.write(self.pin,0)

    def on(self):
        self.pi.hardware_PWM(self.pin, self.f, 1_000_000 * self.duty_cycle)

    def pulse_space(self, micro_pulse, micro_space):
        ns_pulse_end = micro_pulse * 1000
        ns_space_end = ns_pulse_end + micro_space * 1000

        start = time.perf_counter_ns()
        self.on()
        while (time.perf_counter_ns() - start < ns_pulse_end):
            pass
        self.off()
        while (time.perf_counter_ns() - start < ns_space_end):
            pass