from app import ma
from models.booking import Booking
from marshmallow import fields


class BookingSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Booking
        load_instance = True

    owner_id = fields.Integer(data_key='owner_id', many=True)
    borrower_id = fields.Integer(data_key='borrower_id', many=True)

    # borrower_id = fields.Integer(data_key='user_id')
    # users = fields.Nested('UserSchema', many=True)
    # item_id = fields.Nested('ItemSchema')
