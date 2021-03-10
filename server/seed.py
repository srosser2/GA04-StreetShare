from app import app, db
from models.user import User
from models.thread import Thread

from data.user_data import user_data
from data.thread_data import generate_threads

with app.app_context():

    try:
        db.drop_all()
        db.create_all()

        db.session.add_all(user_data)
        db.session.commit()

        users = User.query.all()
        thread_data = generate_threads(users)
        db.session.add_all(thread_data)
        db.session.commit()

        print('Data was imported successfully')

    except Exception as e:
        print('An error occured while importing the data.')
        print(e)