from flask import Blueprint, request, g
# from decorators.secure_route import secure_route
from flask_socketio import emit
from app import socketio

router = Blueprint(__name__, 'sockets')


def message_recieved(methods=['GET', 'POST']):
    print('message recieved backend')

@socketio.on('connect')
def handle_connection(socket):
    socket.emit('hello world',)
    print('Socket IO is connected in the backend')

@socketio.on('sendMessage')
def handle_event(content, mehtods=['GET', 'POST']):
    print(content)
    socketio.emit('messageResponse', json, callback=message_recieved)

