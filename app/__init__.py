from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from app.routes.chat import chat_bp

def create_app():
    basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    dist_folder = os.path.join(basedir, 'dist')
    
    app = Flask(__name__, static_folder=dist_folder, static_url_path='')
    CORS(app)

    app.register_blueprint(chat_bp)

    @app.route("/")
    def index():
        return send_from_directory(dist_folder, 'index.html')

    return app
