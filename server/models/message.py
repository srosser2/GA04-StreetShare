from app import db
from models.base import BaseModel

class Message(db.Model, BaseModel):

    __tablename__ = 'messages'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    thread_id = db.Column(db.Integer, bd.ForeignKey('threads.id'))
    content = db.Column(db.Text, nullable=False)
    