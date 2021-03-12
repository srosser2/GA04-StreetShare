from flask import Blueprint, request
from models.user import User
# from models.thread import Thread
from serializers.user import UserSchema
from serializers.thread import ThreadSchema
from marshmallow.exceptions import ValidationError
# sending confirmation email
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask_mail import Mail, Message

# ends here
user_schema = UserSchema()
thread_schema = ThreadSchema()

router = Blueprint(__name__, 'users')


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


@ router.route('/login', methods=['POST'])
def login():
    user_dict = request.json
    user = User.query.filter_by(email=user_dict['email']).first()
    if not user:
        return {'message': 'User not found'}

    if not user.validate_password(user_dict['password']):
        return {'message': 'Unauthorized: incorrect password'}, 402

    token = user.generate_token()

    return {'token': token}, 200
