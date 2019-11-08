import requests
import logging
import atexit
import time
from dht11 import DHT11
from serial import SingleWireSerialTransport

try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

GPIO14 = 14


def make_pigpio_pi():
    pi = pigpio.pi()
    if not pi.connected:
        return None

    def cleanup():
        pi.set_mode(GPIO14, pigpio.INPUT)
        pi.stop()

    atexit.register(cleanup)
    return pi


if not pigpio:
    exit(1)
pi = make_pigpio_pi()
if not pi:
    logging.warning("Failed to connect to pigpio. Aborting.")
    exit(1)

transport = SingleWireSerialTransport(pi, GPIO14)
dht11 = DHT11(transport)

points = []
for i in range(0, 3):
    points.append(dht11.read())
    time.sleep(1.0)

median_temp = sorted(points, key=lambda p: p.temperature)[1].temperature
median_humidity = sorted(points, key=lambda p: p.humidity)[1].humidity

requests.post('http://localhost:4000/api/update', json={
    'temperature': median_temp,
    'humidity': median_humidity,
})
