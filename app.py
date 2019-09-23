from flask import Flask
from webremote import web, api
from remote.fujitsu_remote import FujitsuRemote
from ir import IRFrame, FakeTransport

app = Flask(__name__, static_folder='webremote/static/build/static')

app.register_blueprint(web.web)
app.register_blueprint(api.web)

transport = FakeTransport()
def send_command(command):
    print(str(command))
    frame = IRFrame()
    frame.add_bytes(command.to_bytes())
    transport.send_frame(frame)

api.remote = FujitsuRemote(on_command=send_command)

if __name__ == "__main__":
    app.run()