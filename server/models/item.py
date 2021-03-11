from app import db
from models.base import BaseModel
from models.user import User


class Item(db.Model, BaseModel):

    __tablename__ = "item"

    title = db.Column(db.String(40), nullable=False, unique=False)
    category = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(200), nullable=True)
    note = db.Column(db.String(200), nullable=True)
    image = db.Column(db.Text, nullable=False)
    # booking = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"))

    booking = db.relationship(
        'Booking', backref='user', cascade="all, delete")

    # ingredients = db.relationship(
    #     'Ingredient', backref='cakes', secondary=cakes_ingredients_join)
