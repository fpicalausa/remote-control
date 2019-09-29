from flask import Blueprint, request, abort
from remote import fujitsu_remote
from remote import fujitsu_remote_command
import json
from .sensor_data import SensorData

web = Blueprint(__name__, "api")

remote = None  # type: fujitsu_remote.FujitsuRemote
sensor = SensorData()


@web.route('/api/off', methods=['POST'])
def off():
    remote.off()
    return json.dumps({'status': 'ok'})


@web.route('/api/on', methods=['POST'])
def on():
    remote.on()
    return json.dumps({'status': 'ok'})


@web.route('/api/mode', methods=['POST'])
def mode():
    data = request.json

    if not data or "mode" not in data:
        abort(400)

    modes = {
        "auto": fujitsu_remote_command.MODE_AUTO,
        "cooler": fujitsu_remote_command.MODE_COOLER,
        "heater": fujitsu_remote_command.MODE_HEATER,
    }

    if not data["mode"] in modes:
        abort(400)

    remote.change_mode(modes[data["mode"]])
    return json.dumps({'status': 'ok'})


@web.route('/api/fan', methods=['POST'])
def fan():
    data = request.json

    if not data or "speed" not in data:
        abort(400)

    modes = {
        "auto": fujitsu_remote_command.FAN_SPD_AUTO,
        "high": fujitsu_remote_command.FAN_SPD_HIGH,
        "low": fujitsu_remote_command.FAN_SPD_LOW,
    }

    if not data["speed"] in modes:
        abort(400)

    remote.change_fan_speed(modes[data["speed"]])
    return json.dumps({'status': 'ok'})


@web.route('/api/temperature', methods=['POST'])
def temperature():
    data = request.json

    if not data or "temperature" not in data:
        abort(400)

    remote.change_temperature(data["temperature"])
    return json.dumps({'status': 'ok'})


@web.route('/api/state', methods=['GET'])
def get_state():
    return json.dumps({
        'temperature': remote.temperature(),
        'mode': remote.mode(),
        'power': remote.is_on(),
    })


@web.route('/api/update', methods=['POST'])
def update_sensor():
    global sensor
    data = request.json

    if not data or ("temperature" not in data) or ("humidity" not in data):
        abort(400)

    sensor.add(data['temperature'], data['humidity'])

    return json.dumps({'status': 'ok'})


@web.route('/api/sensor', methods=['GET'])
def sensor():
    global sensor
    return json.dumps(sensor.get_all())
