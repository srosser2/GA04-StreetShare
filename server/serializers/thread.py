from app import ma
from models.thread import Thread
from marshmallow import fields

class ThreadSchema(ma.SQLAlchemyAutoSchema):
	
	class Meta:
		model = Thread
		load_instance = True

	users = fields.Nested('UserSchema', many=True)
	messages = fields.Nested('MessageSchema', many=True)
