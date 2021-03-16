from flask import Blueprint, request, g
from app import socketio
import json
from flask_socketio import emit, join_room, leave_room
from models.user import User
from models.thread import Thread
from models.message import Message
from serializers.user import UserSchemaBasic


user_schema = UserSchemaBasic()

router = Blueprint(__name__, 'sockets')

@socketio.on('connect')
def connected():
    print('New Websocket connection')
    id = request.args.get('id')

@socketio.on('send-message')
def handle_event(text, recipients, threadId, methods=['GET', 'POST']):
    user_id = request.args.get('id')
    token = request.args.get('token')
    user = User.query.get(user_id)
    join_room(threadId)

    message_dict = { 'content': text, 'recipients': recipients, 'threadId': threadId, 'user': {
        'firstName': user.first_name,
        'lastName': user.last_name,
        'id': user.id,
        'profile_pic': user.profile_pic
    }}

    thread = Thread.query.get(threadId)
    if not user in thread.users:
        print('something went wrong')
        return { 'message': 'Not your thread'}
    try:
        message = Message(user_id=message_dict['user']['id'], user=user, thread_id=message_dict['threadId'], content=message_dict['content'])

    except ValidationError as e:
        print('validation error')
        return {'errors': e.messages, 'messages': 'Something went wrong'}
    
    thread.messages.append(message)
    thread.save()

    socketio.emit('recieve-message', json.dumps(message_dict), room=threadId)