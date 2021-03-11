from app import db, bcrypt
from models.base import BaseModel
from config.environment import secret
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import *
import jwt

from models.base import BaseModel
from models.users_threads import users_threads_join




class User(db.Model, BaseModel):

    __tablename__ = 'users'

    first_name = db.Column(db.String(20), nullable=False, unique=True)
    last_name = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    address = db.Column(db.Text, nullable=False, unique=True)
    profile_pic = db.Column(db.String(200), nullable=True)
    rating = db.Column(db.String(200), nullable=True)
    password_hash = db.Column(db.String(128), nullable=True)
    threads = db.relationship('Thread', backref='users', secondary=users_threads_join)
    messages = db.relationship('Message', backref='users')

    # ? Create a relationship field to comments
    # notification = db.relationship(
    #     'Notification', backref='user', cascade="all, delete")
    # ? Create a relationship field to cakes
    # message = db.relationship('Message', backref='user', cascade="all, delete")

    # ! The equivalent of a virtual field in sqlalchemy
    # ! This is a temporary field that should be not be saved in db

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')

    # !  password Validation
    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)

    # ! Generate a token
    def generate_token(self):
        payload = {
            "sub": self.id,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(days=1)
        }
        token = jwt.encode(payload, secret, 'HS256')

        return token
