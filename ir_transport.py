
class Transport:
    def __init__(self, io, framing):
        self.io = io
        self.framing = framing

    def send_frame(self, frame):
        encoded = frame.encode(self.framing)
        for pulse, pause in encoded:
            self.io.pulse_space(pulse, pause)
