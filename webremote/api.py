from flask import Blueprint, request, abort
from remote import fujitsu_remote
from remote import fujitsu_remote_command
import json

web = Blueprint(__name__, "api")

remote = None # type: fujitsu_remote.FujitsuRemote

@web.route('/api/off', methods=['POST'])
def off():
    remote.off()
    return json.dumps({ 'status': 'ok' })

@web.route('/api/on', methods=['POST'])
def on():
    remote.on()
    return json.dumps({ 'status': 'ok' })

@web.route('/api/mode', methods=['POST'])
def mode():
    data = request.json

    if not data or not "mode" in data:
        abort(400)

    modes = {
        "auto": fujitsu_remote_command.MODE_AUTO,
        "cooler": fujitsu_remote_command.MODE_COOLER,
        "heater": fujitsu_remote_command.MODE_HEATER,
    }

    if not data["mode"] in modes:
        abort(400)

    remote.change_mode(modes[data["mode"]])
    return json.dumps({ 'status': 'ok' })

@web.route('/api/fan', methods=['POST'])
def fan():
    data = request.json

    if not data or not "speed" in data:
        abort(400)

    modes = {
        "auto": fujitsu_remote_command.FAN_SPD_AUTO,
        "high": fujitsu_remote_command.FAN_SPD_HIGH,
        "low": fujitsu_remote_command.FAN_SPD_LOW,
    }

    if not data["speed"] in modes:
        abort(400)

    remote.change_fan_speed(modes[data["speed"]])
    return json.dumps({ 'status': 'ok' })


@web.route('/api/state', methods=['GET'])
def get_state():
    return json.dumps({ 
        'temperature': remote.temperature(),
        'mode': remote.mode(),
        'power': remote.is_on(),
     })