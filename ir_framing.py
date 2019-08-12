import ir_frame



class IRFraming:
    def __init__(self, 
        header_pulse, header_space,
        zero_space, zero_pulse,
        one_space, one_pulse
        ):
        self.header_pulse = header_pulse
        self.header_space = header_space
        self.zero_pulse = zero_pulse
        self.zero_space = zero_space
        self.one_pulse = one_pulse
        self.one_space = one_space

    def frame(self):
        return ir_frame.IRFrame(self)

    def header(self):
        return (self.header_pulse, self.header_space)

    def zero(self):
        return (self.zero_pulse, self.zero_space)

    def one(self):
        return (self.one_pulse, self.one_space)
        