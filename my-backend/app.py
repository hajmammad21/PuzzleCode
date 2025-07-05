from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes.auth import auth_bp
from flask_jwt_extended import JWTManager
from routes.user import user_bp
from routes.admin import admin_bp
from routes.contact import contact_bp
from flask_cors import CORS
from routes.python_missions import missions_bp
from routes.seasons import seasons_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)
    jwt = JWTManager()
    jwt.init_app(app)
    CORS(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(contact_bp, url_prefix='/api')
    app.register_blueprint(missions_bp)
    app.register_blueprint(seasons_bp)
    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
