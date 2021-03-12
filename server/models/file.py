from app import db
from models.base import BaseModel

class File(db.Model, BaseModel):
    
    __tablename__ = 'files'
    
    url = db.Column(db.String(200), nullable=False)
    cloud_id = db.Column(db.String(200), nullable=False)
    # user_id = db