from flask import Blueprint, request, g
from models.category import Category
from serializers.category import CategorySchema
from decorators.secure_route import secure_route
from marshmallow.exceptions import ValidationError

category_schema = CategorySchema()

router = Blueprint(__name__, 'category')


@router.route("/categories", methods=["GET"])
def get_all_categories():
    categories = Category.query.all()
    return category_schema.jsonify(categories, many=True), 200


@router.route("/categories/<int:category_id>", methods=["GET"])
def get_single_item(category_id):
    category = Category.query.get(category_id)
    if not category_id:
        return {"message": "Category not found"}, 404
    return category_schema.jsonify(category), 200
