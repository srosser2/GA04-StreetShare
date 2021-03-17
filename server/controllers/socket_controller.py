from flask import Blueprint, request, g
from app import socketio
from config.environment import secret
import json
import jwt
from flask_socketio import emit, join_room, leave_room
from models.user import User
from models.thread import Thread
from models.message import Message
from serializers.user import UserSchemaBasic
from serializers.message import MessageSchema


user_schema = UserSchemaBasic()
message_schema = UserSchemaBasic()

router = Blueprint(__name__, 'sockets')

@socketio.on('connect')
def connected():
    print('New Websocket connection')
    id = request.args.get('id')

@socketio.on('send-message')
def handle_event(text, recipients, thread_id, token, methods=['GET', 'POST']):

    if not token:
        print('Not token')
        return {'message': 'Unauthorized'}, 401

    try:
        payload = jwt.decode(token, secret, 'HS256')
        user_id = payload['sub']
        user = User.query.get(user_id)
    
    except Exception as e:
        return { 'message': 'User not found'}

    if not user:
        return { 'message': 'Unauthorized' }, 401

    message_dict = { 'content': text, 'recipients': recipients, 'threadId': thread_id, 'user': {
        'firstName': user.first_name,
        'lastName': user.last_name,
        'id': user.id,
        'profile_pic': user.profile_pic
    }}

    join_room(thread_id)

    thread = Thread.query.get(thread_id)
    if not user in thread.users:
        print('something went wrong')
        return { 'message': 'Not your thread'}
    try:
        message = Message(user_id=message_dict['user']['id'], user=user, thread_id=message_dict['threadId'], content=message_dict['content'])

    except ValidationError as e:
        print('validation error')
        return {'errors': e.messages, 'messages': 'Something went wrong'}

    message.save()
    thread.messages.append(message)
    thread.save()
    message_dict['id'] = message.id

    socketio.emit('recieve-message', json.dumps(message_dict), room=thread_id)