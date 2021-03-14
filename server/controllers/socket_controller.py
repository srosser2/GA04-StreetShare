from flask import Blueprint, request, g
from decorators.secure_route import secure_route
from flask_socketio import emit
from app import socketio

router = Blueprint(__name__, 'sockets')


def message_recieved(methods=['GET', 'POST']):
    print('message recieved backend')

@socketio.on('connection')
def handle_connection(socket):
    socket.emit('hello world',)
    print('Socket IO is connected in the backend')

@socketio.on('my event')
def handle_event(json, mehtods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=message_recieved)

