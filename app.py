from flask import Flask
from webremote import web, api
from remote.fujitsu_remote import FujitsuRemote
from ir import IRFrame, IRModulation, FakeTransport, OnePinTransport
import logging
import atexit

GPIO18 = 18

try:
    import pigpio
except:
    logging.warning("Failed to import pigpio.")
    pigpio = None

modulation = IRModulation(
    header_pulse=3338,
    header_space=1599,
    one_pulse=474,
    one_space=1196,
    zero_pulse=474,
    zero_space=376,
    trailer_pulse=474,
    trailer_space=305
)

transport = FakeTransport()


def make_pigpio_pi():
    pi = pigpio.pi()
    if not pi.connected:
        return None

    def cleanup():
        pi.write(GPIO18, 0)
        pi.stop()

    atexit.register(cleanup)
    return pi


if pigpio:
    pi = make_pigpio_pi()

if not pi:
    logging.warning("Unable to connect to pigpio. Aborting.")
    exit(1)

ir_transport = OnePinTransport(pi, GPIO18, 26, modulation)


def send_command(command):
    print(str(command))
    frame = IRFrame()
    frame.add_bytes(command.to_bytes())
    ir_transport.send_frame(frame)


app = Flask(__name__, static_folder='webremote/static/build/static')
app.register_blueprint(web.web)
app.register_blueprint(api.web)

api.remote = FujitsuRemote(on_command=send_command)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
