from app import db
from models.base import BaseModel

class Message(db.Model, BaseModel):

    __tablename__ = 'messages'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref='messages', cascade="all, delete")
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'))
    content = db.Column(db.Text, nullable=False)
    