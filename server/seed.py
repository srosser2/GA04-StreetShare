from data.thread_data import generate_threads
from data.user_data import user_data
from data.item_data import generate_items
from models.thread import Thread
from models.user import User
from app import app, db
from models.item import Item


with app.app_context():

    try:
        db.drop_all()
        db.create_all()

        db.session.add_all(user_data)
        db.session.commit()

        users = User.query.all()
        thread_data = generate_threads(users)
        item_data = generate_items(users)
        db.session.add_all(thread_data)
        db.session.add_all(item_data)
        db.session.commit()

        print('Data was imported successfully')

    except Exception as e:
        print('An error occured while importing the data.')
        print(e)
