from app import db
from models.base import BaseModel

class Booking(db.Model, BaseModel):

    __tablename__ = 'bookings'

    item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    borrower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    owner_decision = db.Column(db.Boolean, nullable=True)
    borrower_decision = db.Column(db.Boolean, nullable=True)
    approval_status = db.Column(db.Boolean)