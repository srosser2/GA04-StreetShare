import os
from flask import Blueprint, request, g
import json
from models.file import File
from serializers.file import FileSchema
from serializers.user import UserSchema
from decorators.secure_route import secure_route
from marshmallow.exceptions import ValidationError

import cloudinary
from cloudinary.api import delete_resources_by_tag, resources_by_tag
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

file_schema = FileSchema()
user_schema = UserSchema()

router = Blueprint(__name__, 'files')

cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME', ''),
    api_key=os.getenv('CLOUD_API_KEY', ''),
    api_secret=os.getenv('CLOUD_API_SECRET', '')
)

@router.route('/files', methods=['GET'])
def get_all_files():
    files = File.query.all()
    return file_schema.jsonify(files, many=True), 200


@router.route('/files', methods=['POST'])
@secure_route
def create_file():
    file_dictionary = request.json
    print('abc')
    try:
        cloud_response = upload(file_dictionary['content'])
        file = File(
            url = cloud_response['secure_url'],
            cloud_id = cloud_response['asset_id'],
            user_id =  g.current_user.id
        )
    except ValidationError as e:
        return {'errors': e.messages, 'messages': 'Something went wrong'}
    file.save()

    return file_schema.jsonify(file), 200

@router.route('/files/<int:file_id>', methods=['DELETE'])
@secure_route
def delete_file(file_id):
    file_to_delete = File.query.get(file_id)
    if not file_to_delete.user_id == g.current_user.id:
        return { 'message': 'This isn\'t your photo' }
    try:
        file_to_delete.remove()

    except ValidationError as e:
        return { 'error': str(e) }

    return file_schema.jsonify(file_to_delete), 200



