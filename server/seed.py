from app import app, db

from models.user import User
from models.category import Category
from models.item import Item
from models.thread import Thread
from models.booking import Booking
from models.file import File

from data.thread_data import generate_threads
from data.user_data import user_data
from data.item_data import generate_items, generate_categories
from data.booking_data import generate_bookings

def seed_data():

    with app.app_context():

        try:
            db.drop_all()
            db.create_all()

            # Generate Users
            db.session.add_all(user_data)
            db.session.commit()
            users = User.query.all()

            # Generate Categories
            categories_data = generate_categories()
            db.session.add_all(categories_data)
            db.session.commit()
            categories = Category.query.all()

            # Generate Threads and messages
            thread_data = generate_threads(users)
            db.session.add_all(thread_data)
            db.session.commit()

            # Generate Items
            item_data = generate_items(users, categories)
            db.session.add_all(item_data)
            db.session.commit()
            items = Item.query.all()

            # Generate Bookings
            booking_data = generate_bookings(users, items)
            db.session.add_all(booking_data)
            db.session.commit()

            print('Data was imported successfully')

        except Exception as e:
            print('An error occured while importing the data.')
            print(e)

seed_data()