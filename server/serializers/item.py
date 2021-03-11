from app import ma
from models.item import Item
from marshmallow import fields


class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True

    # ! Add my user schema
    user = fields.Nested('UserSchema')
