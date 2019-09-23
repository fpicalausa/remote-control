from flask import Blueprint
import json

web = Blueprint(__name__, "api")

remote = None

@web.route('/api/off', methods=['POST'])
def off():
    remote.off()
    return json.dumps({ 'status': 'ok' })