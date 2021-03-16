from flask import request
from app import app, socketio

from controllers import user_controller
from controllers import category_controller
from controllers import item_controller
from controllers import thread_controller
from controllers import message_controller
from controllers import file_controller
from controllers import booking_controller
from controllers import socket_controller

app.register_blueprint(user_controller.router, url_prefix='/api')
app.register_blueprint(category_controller.router, url_prefix='/api')
app.register_blueprint(item_controller.router, url_prefix='/api')
app.register_blueprint(thread_controller.router, url_prefix='/api')
app.register_blueprint(message_controller.router, url_prefix='/api')
app.register_blueprint(file_controller.router, url_prefix='/api')
app.register_blueprint(booking_controller.router, url_prefix='/api')
app.register_blueprint(socket_controller.router)

if __name__ == '__main__':
    print('app.run')
    socketio.run(app, debug=True)