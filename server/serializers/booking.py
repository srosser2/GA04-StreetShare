from app import ma
import datetime as dt
from models.booking import Booking
from marshmallow import fields


class BookingSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Booking
        load_instance = True
        dateformat = '%Y-%m-%dT%H:%M:%S%z'

    item_id = fields.Integer(data_key='itemId')
    owner_id = fields.Integer(data_key='ownerId', many=True)
    borrower_id = fields.Integer(data_key='borrowerId', many=True)
    start_date = fields.DateTime(data_key='startDate')
    end_date = fields.DateTime(data_key='endDate')
    owner_decision = fields.Boolean(data_key='ownerDecision')
    borrower_decision = fields.Boolean(data_key='borrowerDecision')

    # borrower_id = fields.Integer(data_key='user_id')
    # users = fields.Nested('UserSchema', many=True)
    # item_id = fields.Nested('ItemSchema')
