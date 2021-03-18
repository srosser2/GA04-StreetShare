from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import jwt
from flask_mail import Mail, Message
from flask_socketio import *

from config.environment import db_URI

app = Flask(__name__, static_folder='dist')

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
mail = Mail(app)
bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:8001", "http://localhost:5000", 'https://street-share-app.herokuapp.com'])
