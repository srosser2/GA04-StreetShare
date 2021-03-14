from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import jwt
from flask_mail import Mail, Message
from flask_socketio import *

from config.environment import db_URI

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)
mail = Mail(app)
bcrypt = Bcrypt(app)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:8001")


from controllers import user_controller
from controllers import category_controller
# from controllers import item_controller
# from controllers import thread_controller
# from controllers import message_controller
# from controllers import file_controller
# from controllers import booking_controller



app.register_blueprint(user_controller.router, url_prefix='/api')
app.register_blueprint(category_controller.router, url_prefix='/api')
# app.register_blueprint(item_controller.router, url_prefix='/api')
# app.register_blueprint(thread_controller.router, url_prefix='/api')
# app.register_blueprint(message_controller.router, url_prefix='/api')
# app.register_blueprint(file_controller.router, url_prefix='/api')
# app.register_blueprint(booking_controller.router, url_prefix='/api')

# from controllers import user_controller
# from controllers import category_controller
# from controllers import item_controller
# from controllers import thread_controller
# from controllers import message_controller
# from controllers import file_controller
# from controllers import booking_controller
# from controllers import socket_controller

@socketio.on('connect')
def connected():
    print('New Websocket connection')

@socketio.on('sendMessage')
def handle_event(content, mehtods=['GET', 'POST']):
    print(content)
    socketio.emit('serverMessageResponse', content)

# app.register_blueprint(user_controller.router, url_prefix='/api')
# app.register_blueprint(category_controller.router, url_prefix='/api')
# app.register_blueprint(item_controller.router, url_prefix='/api')
# app.register_blueprint(thread_controller.router, url_prefix='/api')
# app.register_blueprint(message_controller.router, url_prefix='/api')
# app.register_blueprint(file_controller.router, url_prefix='/api')
# app.register_blueprint(booking_controller.router, url_prefix='/api')
# app.register_blueprint(socket_controller.router, url_prefix='/')
# ! Hello world flask app to start you off. Replace this with blueprints and routers and so on.


if __name__ == '__main__':
    print('app.run')
    socketio.run(app, debug=True)