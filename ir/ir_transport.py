import logging
try:
    import pigpio
except:
    pigpio = None
    logging.warning("Unable to import pigpio (is it installed?). Some transport won't be available.")

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
        header = [
            pigpio.pulse(1 << self.modulator_pin, 0, self.framing.header_pulse),
            pigpio.pulse(0, 1 << self.modulator_pin, self.framing.header_space)
        ]

        one = [
            pigpio.pulse(1 << self.modulator_pin, 0, self.framing.one_pulse),
            pigpio.pulse(0, 1 << self.modulator_pin, self.framing.one_space)
        ]

        zero = [
            pigpio.pulse(1 << self.modulator_pin, 0, self.framing.zero_pulse),
            pigpio.pulse(0, 1 << self.modulator_pin, self.framing.zero_space)
        ]

        trailer = [
            pigpio.pulse(1 << self.modulator_pin, 0, self.framing.trailer_pulse),
            pigpio.pulse(0, 1 << self.modulator_pin, self.framing.trailer_space)
        ]

        result = header

        for bit in frame.bits:
            result = result + (zero if bit == 0 else one)

        result = result + trailer

        return result

    def send_frame(self, frame):
        self.pi.set_mode(self.modulator_pin, pigpio.OUTPUT)
        self.pi.write(self.modulator_pin, 0)
        self.pi.set_mode(self.pwm_pin, pigpio.OUTPUT)
        self.pi.hardware_PWM(self.pwm_pin, self.freq, 300000)

        self.pi.wave_clear()
        pulses = self.compile_frame(frame)
        self.pi.wave_add_generic(pulses)
        wave = self.pi.wave_create()

        try:
            self.pi.wave_send_once(wave)

            while self.pi.wave_tx_busy(): # wait for waveform to be sent
                time.sleep(0.1)
        finally:
            self.pi.wave_tx_stop()
            self.pi.hardware_PWM(self.pwm_pin, 0, 0)
            self.pi.wave_clear()
            self.pi.write(self.modulator_pin, 0)

class FakeTransport:
   def send_frame(self, frame):
       bytes = frame.to_bytes()
       print(" ".join(bin(byte)[2:].zfill(8) for byte in bytes))
