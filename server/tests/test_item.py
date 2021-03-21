from app import app, db
import pytest
import json
from tests.lib import get_login_token

def test_get_all_items():
    client = app.test_client()

    response = client.get('/api/items', content_type='application/json')
    data_string = response.get_data()
    data = json.loads(data_string)
    assert response.status_code == 200
    
def test_get_single_item():
    client = app.test_client()

    response = client.get('/api/items/3', content_type='application/json')

    assert response.status_code == 200

    
