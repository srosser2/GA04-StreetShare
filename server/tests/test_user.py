from app import app, db
import pytest
import json

@pytest.mark.skip(reason="Awaiting controller")
def test_register():
    client = app.test_client()
    new_user_data = { 'email': 'bob@bob.com', 'username': 'bob1234', 'password': 'bob1234'}
    response = client.post('/api/register', data=json.dumps(new_user_data),
        content_type='application/json'
        )
    
    assert response.status_code == 201


