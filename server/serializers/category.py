from app import ma
from models.category import Category
from marshmallow import fields

class CategorySchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Category
        load_instance = True

    
