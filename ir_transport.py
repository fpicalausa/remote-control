import pigpio
import time

class OnePinTransport:
    def __init__(self, pi, pin, carrier_micros, framing):
        self.pi = pi
        self.framing = framing
        self.carrier_micros = carrier_micros
        self.pin = pin

    def compile_pulse(self, pulse_time, space_time):
        pulses = pulse_time // self.carrier_micros
        spaces = space_time // self.carrier_micros

        if pulses == 0:
            return None
        if spaces == 0:
            return None

        pulse = [pigpio.pulse(1 << self.pin, 0, self.carrier_micros // 2),
                pigpio.pulse(0, 1 << self.pin, self.carrier_micros // 2)]
        
        blank = pigpio.pulse(0, 0, self.carrier_micros * (spaces - 1) - self.carrier_micros // 2)
        self.pi.wave_add_generic(
            pulse * pulses + [blank] 
        )
        
        wave = self.pi.wave_create()
        return wave

    def compile_header(self):
        wave = self.compile_pulse(self.framing.header_pulse, self.framing.header_space)

        if wave == None:
            return [], []

        return [wave], [wave]

    def compile_trailer(self):
        wave = self.compile_pulse(self.framing.trailer_pulse, self.framing.trailer_space)

        if wave == None:
            return [], []

        return [wave], [wave]

    def compile_data(self, frame):
        wave_zero = self.compile_pulse(self.framing.zero_pulse, self.framing.zero_space)
        wave_one = self.compile_pulse(self.framing.one_pulse, self.framing.one_space)
        result = []

        for bit in frame.bits:
            pulse = [wave_zero if bit == 0 else wave_one]
            result = result + pulse

        return result, [wave_zero, wave_one]

    def compile_frame(self, frame):
        head, w1 = self.compile_header()
        data, w2 = self.compile_data(frame)
        trail, w3 = self.compile_trailer()

        return head + data + trail, w1 + w2 + w3

    def send_frame(self, frame):
        self.pi.wave_clear()
        chain, waves = self.compile_frame(frame)

        self.pi.set_mode(self.pin, pigpio.OUTPUT)
        if self.pi.wave_chain(chain) != 0:
            raise RuntimeError("Failed to build chain")

        while self.pi.wave_tx_busy():
            time.sleep(0.1)

        self.pi.write(self.pin, 0)

        for wave in waves:
            self.pi.wave_delete(wave)

class ModulatedPinTransport:

    def __init__(self, pi, pwm_pin, modulator_pin, freq, framing):
        self.pi = pi
        self.framing = framing
        self.freq = freq
        self.pwm_pin = pwm_pin
        self.modulator_pin = modulator_pin

    def compile_frame(self, frame):
        signal = TimedSignal()

        signal.pulse_space(self.framing.header_pulse, self.framing.header_space)
        for bit in frame.bits:
            if bit == 0:
                signal.pulse_space(self.framing.zero_pulse, self.framing.zero_space)
            else:
                signal.pulse_space(self.framing.one_pulse, self.framing.one_space)
        signal.pulse_space(self.framing.trailer_pulse, self.framing.trailer_space)

        return signal.result

    def send_frame(self, frame):
        signal = self.compile_frame(frame)

        self.pi.set_mode(self.modulator_pin, pigpio.OUTPUT)
        self.pi.write(self.modulator_pin, 0)
        self.pi.set_mode(self.pwm_pin, pigpio.OUTPUT)
        self.pi.hardware_PWM(self.pwm_pin, self.freq, 500000)

        try:
            start = time.clock_gettime(time.CLOCK_MONOTONIC_RAW)
            for state, deadline in signal:
                self.pi.write(self.modulator_pin, state)
                while ((time.clock_gettime(time.CLOCK_MONOTONIC_RAW) - start) < deadline):
                    continue
        finally:
            self.pi.write(self.modulator_pin, 0)
            self.pi.hardware_PWM(self.pwm_pin, 0, 0)
