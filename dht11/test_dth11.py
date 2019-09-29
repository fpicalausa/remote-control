import unittest
from unittest.mock import MagicMock
from dht11 import DHT11


class DHT11Test(unittest.TestCase):
    def test_decoding(self):
        transport = MagicMock()
        dht11 = DHT11(transport, 1)
        transport.read.return_value = [
            0, 1, 0, 0, 0, 0, 1, 1,  # 67
            0, 0, 0, 0, 0, 0, 0, 0,  # 0
            0, 0, 0, 1, 1, 0, 0, 1,  # 25
            0, 0, 0, 0, 0, 1, 0, 0,  # 4
            0, 1, 1, 0, 0, 0, 0, 0,
        ]

        value = dht11.read()
        self.assertEqual(25, value.temperature)
        self.assertEqual(67, value.humidity)
