from flask import Flask, render_template
from flask_cors import CORS
from app.routes.chat import chat_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(chat_bp)

    @app.route("/")
    def index():
        return render_template("index.html")

    return app
