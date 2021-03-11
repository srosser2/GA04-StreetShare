from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
import jwt

from config.environment import db_URI

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)

from controllers import user_controller

app.register_blueprint(user_controller.router, url_prefix='/api')

# ! Hello world flask app to start you off. Replace this with blueprints and routers and so on.
@app.route('/api')
def index():
    return { 'message': "Hello, World!" }