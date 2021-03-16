from app import db
from models.base import BaseModel
# from models.user import User
# from models.thread import Thread

users_threads_join = db.Table('users_threads',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('thread_id', db.Integer, db.ForeignKey('threads.id'), primary_key=True)
)