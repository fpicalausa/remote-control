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

value = dht11.read()

requests.post('http://localhost:4000/api/update', json={
    'temperature': value.temperature,
    'humidity': value.humidity,
})
