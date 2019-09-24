from flask import Blueprint
import json

web = Blueprint(__name__, "api")

remote = None

@web.route('/api/off', methods=['POST'])
def off():
    remote.off()
    return json.dumps({ 'status': 'ok' })

@web.route('/api/on', methods=['POST'])
def on():
    remote.on()
    return json.dumps({ 'status': 'ok' })

@web.route('/api/state', methods=['GET'])
def get_state():
    return json.dumps({ 
        'temperature': remote.get_temperature(),
        'mode': remote.get_mode(),
        'power': remote.is_on(),
     })