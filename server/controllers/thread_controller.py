from flask import Blueprint, request, g
from models.thread import Thread
from models.message import Message

from serializers.thread import ThreadSchema
from serializers.message import MessageSchema

thread_schema = ThreadSchema()
message_schema = MessageSchema()

router = Blueprint(__name__, 'threads')


@router.route("/threads", methods=["GET"])
def get_all_items():
    threads = Thread.query.all()
    for thread in threads:
        messages = Message.query.filter_by(thread_id = thread.id)
        print(messages)
    
    return thread_schema.jsonify(threads, many=True), 200


@router.route("/threads/<int:thread_id>", methods=["GET"])
def get_single_item(thread_id):
    thread = Thread.query.get(thread_id)
    if not thread_id:
        return {"message": "Thread not found"}, 404
    return thread_schema.jsonify(thread), 200

# @router.route("/items/<int:item_id>", methods=["DELETE"])
# @secure_route
# def remove_item(item_id):
#     item = Item.query.get(item_id)
#     if item.user_id != g.current_user.id:
#         return {'errors': 'This is not your item!'}, 402
#     item.remove()
#     return {"message": "Item deleted successfully"}, 200
