import time


class DHT11Reading:
    def __init__(self, temperature, humidity):
        self.temperature = temperature
        self.humidity = humidity


class DHT11:
    def __init__(self, transport, read_retries=5):
        self.transport = transport
        self.read_retries = read_retries

    @staticmethod
    def _to_bytes(bits):
        data_bytes = []
        for i in range(0, len(bits), 8):
            byte = 0
            for bit in bits[i:i+8]:
                byte = (byte << 1) | bit
            data_bytes.append(byte)
        return data_bytes

    def _read_bytes(self):
        bits = self.transport.read()

        if len(bits) != 40:
            raise ValueError("Incomplete frame: length is " + str(len(bits)))

        data_bytes = DHT11._to_bytes(bits)
        checksum = sum(data_bytes[:-1]) & 0xFF

        if data_bytes[-1] != checksum:
            raise ValueError("Checksum mismatch")

        return data_bytes[:-1]

    def _read_with_retries(self):
        retries = 0
        last_error = None

        while retries < self.read_retries:
            retries = retries + 1
            try:
                return self._read_bytes()
            except ValueError as e:
                last_error = e
                time.sleep(1)

        raise last_error

    def read(self):
        result = self._read_with_retries()

        return DHT11Reading(result[2], result[0])
