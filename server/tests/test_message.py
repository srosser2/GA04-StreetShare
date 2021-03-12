from app import app, db
import pytest
import json

@pytest.mark.skip(reason="Awaiting controller")
def test_create_message():
    client = app.test_client()
    new_message_data = { 'email': 'bob@bob.com', 'first_name': 'Bob', 'last_name': 'Roberts', 'password': 'bob1234'}
    response = client.post('/api/messages', data=json.dumps(new_user_data),
        content_type='application/json'
        )
    
    assert response.status_code == 201


