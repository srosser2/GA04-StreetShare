from app import db
from models.base import BaseModel
from models.booking import Booking
# from models.user import User


class Item(db.Model, BaseModel):

    __tablename__ = "items"

    title = db.Column(db.String(40), nullable=False, unique=False)
    category = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    note = db.Column(db.String(200), nullable=True)
    image = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id))

    bookings = db.relationship(
        'Booking', backref='item', cascade="all, delete")
