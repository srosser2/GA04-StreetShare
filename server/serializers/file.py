from app import ma
from models.file import File
from marshmallow import fields

class FileSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = File
        load_instance = True

    user_id = fields.Integer(data_key='user_id')
