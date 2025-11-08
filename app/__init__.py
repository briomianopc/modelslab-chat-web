from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from app.routes.chat import chat_bp

def create_app():
    # 获取项目根目录
    basedir = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
    app = Flask(__name__, static_folder=basedir, static_url_path='')
    CORS(app)

    app.register_blueprint(chat_bp)

    @app.route("/")
    def index():
        return send_from_directory(basedir, 'index.html')

    return app
