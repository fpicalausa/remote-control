from flask import Blueprint, request, abort
from remote import fujitsu_remote
from remote import fujitsu_remote_command
from timers import Timers, TimerCommand, Timer
import json

web = Blueprint(__name__, "api")

remote = None  # type: fujitsu_remote.FujitsuRemote
sensor = None
timers = None  # type: Timers


def serialize_mode(mode):
    modes = {
        fujitsu_remote_command.MODE_AUTO: "auto",
        fujitsu_remote_command.MODE_COOLER: "cooler",
        fujitsu_remote_command.MODE_HEATER: "heater",
        fujitsu_remote_command.MODE_DRY: "dry",
        fujitsu_remote_command.MODE_FAN: "fan",
    }

    if mode not in modes:
        return None
    return modes[mode]


def serialize_fan(speed):
    fan_speeds = {
        fujitsu_remote_command.FAN_SPD_AUTO: "auto",
        fujitsu_remote_command.FAN_SPD_HIGH: "high",
        fujitsu_remote_command.FAN_SPD_LOW: "low",
        fujitsu_remote_command.FAN_SPD_QUIET: "quiet",
        fujitsu_remote_command.FAN_SPD_NATURAL: "natural",
    }

    if speed not in fan_speeds:
        return None
    return fan_speeds[speed]


def convert_mode(mode):
    modes = {
        "auto": fujitsu_remote_command.MODE_AUTO,
        "cooler": fujitsu_remote_command.MODE_COOLER,
        "heater": fujitsu_remote_command.MODE_HEATER,
        "dry": fujitsu_remote_command.MODE_DRY,
        "fan": fujitsu_remote_command.MODE_FAN,
    }

    if mode not in modes:
        return None
    return modes[mode]


def convert_fan(speed):
    fan_speeds = {
        "auto": fujitsu_remote_command.FAN_SPD_AUTO,
        "high": fujitsu_remote_command.FAN_SPD_HIGH,
        "low": fujitsu_remote_command.FAN_SPD_LOW,
        "quiet": fujitsu_remote_command.FAN_SPD_QUIET,
        "natural": fujitsu_remote_command.FAN_SPD_NATURAL,
    }

    if speed not in fan_speeds:
        return None
    return fan_speeds[speed]


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

    mode = convert_mode(data["mode"])
    if mode is None:
        abort(400)
    remote.change_mode(mode)
    return json.dumps({'status': 'ok'})


@web.route('/api/fan', methods=['POST'])
def fan():
    data = request.json

    if not data or "speed" not in data:
        abort(400)

    fan = convert_fan(data["speed"])
    if fan is None:
        abort(400)

    remote.change_fan_speed(fan)
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
        'fan_speed': remote.fan_speed(),
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
def get_sensor():
    global sensor
    return json.dumps(sensor.get_all())


@web.route('/api/timers', methods=['GET'])
def get_timers():
    global timers
    return json.dumps([timer_to_json(t) for t in timers.timers])


def command_to_json(command):
    if not command.on:
        return {"on_off": "off"}

    return {
        "on_off": "on",
        "temperature": command.temperature,
        "fan": serialize_fan(command.fan),
        "mode": serialize_mode(command.mode),
    }


def timer_to_json(timer):
    return {
        "tid": timer.tid,
        "time": ":".join([str(p) for p in timer.time]),
        "enabled": timer.enabled,
        "command": command_to_json(timer.command)
    }


@web.route('/api/timers', methods=['POST'])
def create_timer():
    global timers

    if not request.json:
        abort(400)

    timer = parse_timer_data(0, request.json)
    if timer is None:
        abort(400)
    timers.add(timer)
    return json.dumps(timer_to_json(timer))


def parse_time(hour_min):
    split = hour_min.split(':')
    if len(split) != 2:
        return None

    [hour, minute] = split

    try:
        hour = int(hour)
        minute = int(minute)
    except ValueError:
        return None

    if (hour > 23 or hour < 0):
        return None
    if (minute > 59 or minute < 0):
        return None

    return [hour, minute]


def parse_command(data):
    if 'on_off' not in data:
        return None

    if data['on_off'] == 'on':
        if 'temperature' not in data:
            return None
        if 'fan' not in data:
            return None
        if 'mode' not in data:
            return None

        fan = convert_fan(data['fan'])
        mode = convert_mode(data['mode'])
        temperature = int(data['temperature'])

        if fan is None or mode is None:
            return None

        if (
            temperature > fujitsu_remote.TEMP_MAX_C or
            temperature < fujitsu_remote.TEMP_MIN_C
        ):
            return None

        return TimerCommand(True, temperature, fan, mode)
    elif data['on_off'] == 'off':
        return TimerCommand(False, None, None, None)

    return None


def parse_timer_data(tid, data):
    if 'time' not in data:
        return None
    time = parse_time(data['time'])
    if time is None:
        return None

    if 'command' not in data:
        return None
    command = parse_command(data['command'])

    if 'enabled' not in data:
        return None
    enabled = data['enabled']
    if enabled not in [True, False]:
        return None

    return Timer(tid, time, command, enabled)


@web.route('/api/timers/<int:tid>', methods=['PUT'])
def set_timer(tid):
    global timers

    if not request.json:
        abort(400)

    timer = parse_timer_data(tid, request.json)
    if timer is None:
        abort(400)

    timers.replace(timer)
    return json.dumps(timer_to_json(timer))


@web.route('/api/timers/<int:tid>', methods=['DELETE'])
def remove_timers(tid):
    global timers
    timers.remove(tid)
    return json.dumps({'status': 'ok'})


@web.route('/api/timers/check', methods=['POST'])
def run_timers():
    global timers
    timers.run()
    return json.dumps({'status': 'ok'})
