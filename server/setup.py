from flask import request
from app import app, socketio
import os
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


@app.route('/', defaults={'path': ''})  # homepage
@app.route('/<path:path>')  # any other path
def catch_all(path):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'dist/' + path)

    if os.path.isfile(filename):  # if path is a file, send it back
        return app.send_static_file(path)

    # otherwise send back the index.html file
    return app.send_static_file('index.html')


if __name__ == '__main__':
    print('app.run')
    socketio.run(app, host='0.0.0.0', port=os.getenv(
        'PORT', 5000),  debug=False)
