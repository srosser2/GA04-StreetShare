from flask import Blueprint, request, g
from decorators.secure_route import secure_route

from models.message import Message
from models.thread import Thread

from serializers.message import MessageSchema
from serializers.thread import ThreadSchema

message_schema = MessageSchema()
thread_schema = ThreadSchema()

router = Blueprint(__name__, 'messages')


@router.route('/threads/<int:thread_id>/messages', methods=['GET'])
@secure_route
def get_all_messages(thread_id):
    thread = Thread.query.get(thread_id)
    messages = thread.messages
    return message_schema.jsonify(messages, many=True), 200
    # TODO - Only users involved the thread can see the messages
    # if not g.current_user.id in thread.users:
    #     return { 'message': 'You are not authorized to see this message' }
    # return thread_schema.jsonify(threads, many=True), 200

@router.route('/threads/<int:thread_id>/messages', methods=['POST'])
@secure_route
def post_messages(thread_id):
    thread = Thread.query.get(thread_id)
    if not g.current_user in thread.users:
        return { 'message': 'Not your thread'}
    try:
        message_dictionary = request.json
        message = message_schema.load(message_dictionary)
        message.user_id = g.current_user.id
    except ValidationError as e:
        return {'errors': e.messages, 'messages': 'Something went wrong'}
    
    thread.messages.append(message)
    thread.save()
    return message_schema.jsonify(message), 201


# @router.route('/threads/<int:thread_id>', methods=['GET'])
# def get_single_item(thread_id):
#     thread = Thread.query.get(thread_id)
#     if not thread_id:
#         return {'message': 'Thread not found'}, 404
#     return thread_schema.jsonify(thread), 200

# @router.route('/items/<int:item_id>', methods=['DELETE'])
# @secure_route
# def remove_item(item_id):
#     item = Item.query.get(item_id)
#     if item.user_id != g.current_user.id:
#         return {'errors': 'This is not your item!'}, 402
#     item.remove()
#     return {'message': 'Item deleted successfully'}, 200
