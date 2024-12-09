#add tables to our models

from . import  db 
from flask_login import UserMixin
from uuid import uuid4

def get_uuid():
    # Generate a UUID and take the first 8 characters
    uuid_str = str(uuid4())[:3]

    # Convert it to an integer
    short_id = int(uuid_str, 16)
    return short_id
class User(UserMixin, db.Model):
    #when we run app.py we created the columns
    id = db.Column (db.Integer, primary_key= True, unique= True, default= get_uuid)
    username= db.Column(db.String(100), unique=True, nullable=False)
    email= db.Column(db.String(100), unique=True, nullable=False)
    password_ha= db.Column(db.String(1000), nullable=False)
    created_at= db.Column(db.DateTime, server_default=db.func.now())
    #updated_at= db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    def __repr__(self):
        return '<User %r>' % self.username

# Create a blog post model
class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    imagePath = db.Column(db.String(255)) #path to image file
    imagePreview = db.Column(db.String(255)) #preview the image file
    mainCategory = db.Column(db.String(255))
    subCategory = db.Column(db.String(255))
    title = db.Column(db.String(255))
    description = db.Column(db.Text)
    price = db.Column(db.Integer)
    author = db.Column(db.String(255)) # will eventually turn author into the user itself
    date_posted = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f' <Post {self.title}>'




