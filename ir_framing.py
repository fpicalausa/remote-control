import ir_frame

class IRFraming:
    def __init__(self, 
        header_pulse, header_space,
        zero_space, zero_pulse,
        one_space, one_pulse,
        trailer_pulse, trailer_space
        ):
        self.header_pulse = header_pulse
        self.header_space = header_space
        self.zero_pulse = zero_pulse
        self.zero_space = zero_space
        self.one_pulse = one_pulse
        self.one_space = one_space
        self.trailer_pulse = trailer_pulse
        self.trailer_space = trailer_space

    def frame(self):
        return ir_frame.IRFrame()

    def frame_from_bytes(self, *bytes):
        frame = ir_frame.IRFrame()
        frame.add_bytes(*bytes)
        return frame

    def header(self):
        return (self.header_pulse, self.header_space)

    def trailer(self):
        return (self.trailer_pulse, self.trailer_space)

    def zero(self):
        return (self.zero_pulse, self.zero_space)

    def one(self):
        return (self.one_pulse, self.one_space)
        