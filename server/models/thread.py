from app import db
from models.base import BaseModel
# from models.user import User
from models.message import Message
from models.users_threads import users_threads_join

class Thread(db.Model, BaseModel):

    __tablename__ = 'threads'

    users = db.relationship('User', backref='threads', secondary=users_threads_join)
    messages = db.relationship('Message', backref='threads')