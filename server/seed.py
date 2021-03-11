from app import app, db
from data.item_data import list_items
from data.user_data import list_users

with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.add_all(list_items)
    db.session.add_all(list_users)
    db.session.commit()
