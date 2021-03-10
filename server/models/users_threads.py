from app import db
from models.base import BaseModel

users_threads_join = db.Table('users_threads',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('thread_id', db.Integer, db.ForeignKey('threads.id'), primary_key=True)
)