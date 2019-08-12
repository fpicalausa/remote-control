class IRFrame:
    def __init__(self, framing):
        self.framing = framing
        self.bits = []

    def add_bits(self, data, length):
        bits = []
        for _ in range(0, length):
            bit = data & 1
            data = data >> 1
            bits.append(bit)
            
        self.bits = self.bits + [b for b in reversed(bits)]

    def add_bit(self, bit):
        self.bits.append(bit)

    def add_bits_array(self, bits):
        self.bits = self.bits + [1 if b else 0 for b in bits]

    def _encode_bits(self, framing):
        return [framing.one() if b else framing.zero() for b in self.bits]

    def encode(self, framing):
        return [framing.header()] + self._encode_bits(framing)