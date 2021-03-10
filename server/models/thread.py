from app import db
from models.base import BaseModel

class Thread(db.Model, BaseModel):

    __tablename__ = 'threads'

    users = db.relationship('User', backref='threads', secondary=users_threads_join)
    messages = db.relationship('Message', backref='threads')