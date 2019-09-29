import unittest
from sensor_data import SensorData


class FixedTime():
    def __init__(self):
        self.time = 0

    def advance(self, seconds):
        self.time = self.time + seconds * 1000000000

    def time_ns(self):
        return self.time


class TestSensorData(unittest.TestCase):
    def test_add(self):
        time = FixedTime()
        sensor = SensorData(time)
        sensor.add(10, 15)
        time.advance(60)
        sensor.add(20, 25)

        self.assertEqual(
            sensor.get_all(),
            [
                {'temperature': 20, 'humidity': 25, 'timestamp': 60},
                {'temperature': 10, 'humidity': 15, 'timestamp': 0},
            ]
        )

    def test_prune_on_add(self):
        time = FixedTime()
        sensor = SensorData(time)
        sensor.add(10, 15)
        time.advance(24 * 3600 + 1)
        sensor.add(20, 25)

        self.assertEqual(
            sensor.get_all(),
            [
                {'temperature': 20, 'humidity': 25, 'timestamp': 24*3600+1},
            ]
        )

    def test_prune_on_get(self):
        time = FixedTime()
        sensor = SensorData(time)
        sensor.add(10, 15)
        time.advance(10)
        sensor.add(20, 25)
        time.advance(24 * 3600 + 1)

        self.assertEqual(
            sensor.get_all(),
            [
                {'temperature': 20, 'humidity': 25, 'timestamp': 10},
            ]
        )
