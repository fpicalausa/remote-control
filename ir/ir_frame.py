class IRFrame:
    def __init__(self):
        self.bits = []

    def add_bit(self, bit):
        self.bits.append(1 if bit else 0)

    def add_bits_array(self, bits):
        self.bits = self.bits + [1 if b else 0 for b in bits]

    def add_byte(self, byte):
        bits = []
        for _ in range(0, 8):
            bit = byte & 1
            byte = byte >> 1
            bits.append(bit)
            
        self.bits = self.bits + [b for b in reversed(bits)]

    def add_bytes(self, bytes):
        for byte in bytes:
            self.add_byte(byte)

    def to_bytes(self):
        bytes = []
        for i in range(0, len(self.bits), 8):
            byte = 0
            for bit in self.bits[i:i+8]:
                byte = (byte << 1) | bit
            bytes.append(byte)
        return bytes