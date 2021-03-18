from app import app
import pytest
import json
from tests.lib import get_login_token

# @pytest.mark.skip(reason="Awaiting controller")
def test_register():
    client = app.test_client()

    new_user_data = { 'email': 'bob@bob.com', 'first_name': 'Bob', 'last_name': 'Roberts', 'password': 'bob1234'}
    response = client.post('/api/register', data = json.dumps(new_user_data), content_type='application/json')
    
    assert response.status_code == 200

def test_update_user_by_id_no_token():
    client = app.test_client()
    token = get_login_token()

    updated_user_data = { 'address1': '2021 Test Street' }
    response = client.put('/api/users/1', data=json.dumps(updated_user_data), content_type='application/json')
    assert response.status_code == 401

def test_update_user_by_id():
    client = app.test_client()
    token = get_login_token()

    updated_user_data = { 'address1': '2021 Test Street' }
    response = client.put('/api/users/1', data=json.dumps(updated_user_data), content_type='application/json', headers={ 'Authorization': f'Bearer {token}'})
    data_string = response.get_data()
    data = json.loads(data_string)
    assert response.status_code == 200
    assert data['address1'] == '2021 Test Street'

