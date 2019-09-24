from flask import Flask
from webremote import web, api
from remote.fujitsu_remote import FujitsuRemote
from ir import IRFrame, IRModulation, FakeTransport, OnePinTransport
import atexit

GPIO18 = 18 # has PWM0 capability

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

def make_pigpio_transport():
    pi = pigpio.pi()
    if not pi.connected:
        return None

    def cleanup():
        pi.write(GPIO18, 0)
        pi.write(GPIO23, 0)
        pi.stop()

    atexit.register(cleanup)

    return OnePinTransport(pi, GPIO18, 26, modulation)
    #return ModulatedPinTransport(pi, GPIO18, GPIO23, 38000, modulation)

if pigpio:
    transport = make_pigpio_transport()

app = Flask(__name__, static_folder='webremote/static/build/static')

app.register_blueprint(web.web)
app.register_blueprint(api.web)

def send_command(command):
    print(str(command))
    frame = IRFrame()
    frame.add_bytes(command.to_bytes())
    transport.send_frame(frame)

api.remote = FujitsuRemote(on_command=send_command)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
