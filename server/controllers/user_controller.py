from flask import Blueprint, request, g

router = Blueprint('user_controller', __name__)

from marshmallow.exceptions import ValidationError

from models.user import User
# from models.thread import Thread
from serializers.user import UserSchema
from serializers.item import ItemSchema
# from serializers.thread import ThreadSchema
# sending confirmation email
# import os
# from sendgrid import SendGridAPIClient
# from sendgrid.helpers.mail import Mail
# from flask_mail import Mail, Message
from decorators.secure_route import secure_route

# ends here
user_schema = UserSchema()
item_schema = ItemSchema()
# thread_schema = ThreadSchema()




@router.route('/register', methods=['POST'])
def register():
    user_dict = request.json

    try:
        user = user_schema.load(user_dict)

    except ValidationError as e:
        return {'errors': e.messages, 'messages': 'Something went wrong'}

    user.save()

    # message = Mail(
    #     from_email='yusufm.musa963@gmail.com',
    #     to_emails='yusufm.musa963@gmail.com',
    #     subject='Sending with Twilio SendGrid is Fun',
    #     html_content='<strong>and easy to do anywhere, even with Python</strong>')

    # try:
    #     sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    # print(sg)
    # for attr, value in sg.__dict__.items():
    #     print(attr, value)

    # response = sg.send(message)
    # print(response.status_code)
    # print(response.body)
    # print(response.headers)
    # except Exception as e:
    #     return e.message

    return user_schema.jsonify(user), 201


@router.route('/login', methods=['POST'])
def login():
    user_dict = request.json
    user = User.query.filter_by(email=user_dict['email']).first()
    if not user:
        return {'message': 'User not found'}

    if not user.validate_password(user_dict['password']):
        return {'message': 'Unauthorized: incorrect password'}, 401

    token = user.generate_token()

    return {'token': token}, 200


@router.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200


@router.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found.'}

    return user_schema.jsonify(user), 200


@router.route('/users/<int:user_id>', methods=['PUT'])
@secure_route
def update_user_by_id(user_id):
    existing_user = User.query.get(user_id)
    user_dictionary = request.json

    if not existing_user:
        return {'error': 'User not found.'}

    if not existing_user == g.current_user:
        return {'error': 'Unauthorized.'}

    try:
        user = user_schema.load(
            user_dictionary,
            instance=existing_user,
            partial=True
        )
    except ValidationError as e:
        return {'error': 'Something went wrong.'},

    user.save()

    return user_schema.jsonify(user), 200
