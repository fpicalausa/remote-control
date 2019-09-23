from flask import Blueprint,redirect,send_from_directory,abort
import os

web = Blueprint('web', __name__)
root_path=os.path.join(os.path.dirname(__file__), 'static', 'build')

@web.route('/')
def index():
    return send_from_directory(root_path, 'index.html')