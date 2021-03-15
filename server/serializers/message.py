from app import ma
from models.message import Message
from marshmallow import fields

class MessageSchema(ma.SQLAlchemyAutoSchema):
	
	class Meta:
		model = Message
		load_instance = True

	user = ma.Nested('UserSchemaBasic', exclude=('address', 'email', 'password_hash', 'created_at', 'rating'))