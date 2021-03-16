from app import db
from models.base import BaseModel
from models.item import Item

class Category(db.Model, BaseModel):
    
    __tablename__ = 'categories'
    
    name = db.Column(db.String(50), nullable=False)
    items = db.relationship('Item', backref='categories')