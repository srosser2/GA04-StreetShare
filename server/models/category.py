from app import db
from models.base import BaseModel

class Category(db.Model, BaseModel):
    
     __tablename__ = 'categories'
    
    name = db.Column(db.String(50), nullable=False)
    items = db.relationship('Category', backref='categories')