from flask import Blueprint, request, g
from models.user import User
# from models.thread import Thread
from serializers.user import UserSchema
from serializers.thread import ThreadSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

user_schema = UserSchema()
thread_schema = ThreadSchema()

router = Blueprint(__name__, 'users')

@router.route('/register', methods=['POST'])
def register():
	user_dict = request.json
	
	try:
		user = user_schema.load(user_dict)

	except ValidationError as e:
		return { 'errors': e.messages, 'messages': 'Something went wrong' }
	
	user.save()

	print(user)

	return user_schema.jsonify(user), 201

@router.route('/login', methods=['POST'])
def login():
	user_dict = request.json
	user = User.query.filter_by(email = user_dict['email']).first()
	if not user:
		return { 'message': 'User not found' }
	
	if not user.validate_password(user_dict['password']):
		return { 'message' : 'Unauthorized: incorrect password' }, 402
	
	token = user.generate_token()

	return { 'token': token}, 200

@router.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200

@router.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return { 'error': 'User not found.'}
    
    return user_schema.jsonify(user), 200

@router.route('/users/<int:user_id>', methods=['PUT'])
@secure_route
def update_user_by_id(user_id):
    existing_user = User.query.get(user_id)
    user_dictionary = request.json

    if not existing_user:
        return { 'error': 'User not found.'}

    if not existing_user == g.current_user:
        return { 'error': 'Unauthorized.'}

    try:
        user = user_schema.load(
            user_dictionary,
            instance=existing_user,
            partial=True
        )
    except ValidationError as e:
        return { 'error': 'Something went wrong.'}, 

    user.save()
    
    return user_schema.jsonify(user), 200
    