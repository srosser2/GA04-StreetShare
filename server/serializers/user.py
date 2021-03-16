from app import ma
from models.user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):
	
	class Meta:
		model = User
		load_instance = True
		exclude = ('password_hash',)
		load_only = ('email', 'password')
		
	first_name = fields.String(data_key='firstName')
	last_name = fields.String(data_key='lastName')
	profile_pic = fields.String(data_key='profilePic')
	# threads = fields.Nested('ThreadSchema', many=True)
	# files = fields.Nested('FileSchema', many=True)
	items = fields.Nested('ItemSchema', many=True)
	bookings = fields.Nested('BookingSchema', many=True)
	password = fields.String(required=True)


class UserSchemaBasic(ma.SQLAlchemyAutoSchema):

	class Meta:
		model = User
		# load_instance = True
	first_name = fields.String(data_key='firstName')
	last_name = fields.String(data_key='lastName')
	ma.auto_field('address', hide=True) 
