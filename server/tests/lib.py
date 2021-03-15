from app import app, db
from setup import *
import json
from models.user import User
from models.thread import Thread

from seed import seed_data

def setup_db():
    seed_data()


def get_login_token():
    client = app.test_client()
    user_data = { 'email': 'samr@samr.com', 'password': 'samr1234'}
    response = client.post('/api/login', data=json.dumps(user_data),
        content_type='application/json'
        )
    data_string = response.get_data()
    data = json.loads(data_string)
    return data['token']
