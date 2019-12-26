from flask import Flask
from webremote import web, api
from remote.fujitsu_remote import FujitsuRemote
from ir import IRFrame, FakeTransport
from webremote.sensor_data import SensorData
import os.path
import json
from timers import Timers

HISTFILE = 'sensor.json'
ENV = 'pi'

if ENV == 'dev':
    transport = FakeTransport()
else:
    from pi_transport import transport
    if transport is None:
        exit(1)


def send_command(command):
    print(str(command))
    frame = IRFrame()
    frame.add_bytes(command.to_bytes())
    transport.send_frame(frame)


app = Flask(__name__, static_folder='webremote/static/build/static')
app.register_blueprint(web.web)
app.register_blueprint(api.web)

api.remote = FujitsuRemote(on_command=send_command)
api.timers = Timers(api.remote)

data = []
if os.path.exists(HISTFILE):
    with open(HISTFILE, 'r') as f:
        data = [json.loads(l) for l in f.readlines() if len(l.strip()) > 0]


def on_data(data):
    if os.path.getsize(HISTFILE) > 500000:
        with open(HISTFILE, 'r') as f:
            previous = [json.loads(l) for l in f.readlines()][:5000]

        with open(HISTFILE, 'w') as f:
            f.write("\n".join(previous))
            f.write("\n")
            json.dump(data, f)
    else:
        with open(HISTFILE, 'a') as f:
            f.write("\n")
            json.dump(data, f)


api.sensor = SensorData(data, on_data)

if __name__ == "__main__":
    app.run(host='0.0.0.0')
