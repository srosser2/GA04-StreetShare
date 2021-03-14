from app import ma
from models.thread import Thread
from marshmallow import fields

class ThreadSchema(ma.SQLAlchemyAutoSchema):
	
	class Meta:
		model = Thread
		load_instance = True

	users = fields.Nested('UserSchemaBasic', many=True, exclude=('address', 'email', 'password_hash', 'created_at', 'rating'))
	messages = fields.Nested('MessageSchema', many=True)
