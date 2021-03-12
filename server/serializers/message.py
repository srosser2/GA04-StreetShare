from app import ma
from models.message import Message
from marshmallow import fields

class MessageSchema(ma.SQLAlchemyAutoSchema):
	
	class Meta:
		model = Message
		load_instance = True

	user_id = fields.Integer(data_key='user_id')