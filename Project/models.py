#add tables to our models

from . import  db 
from flask_login import UserMixin

class User(UserMixin, db.Model):
    #when we run app.py we created the columns
    id = db.Column (db.Integer, primary_key= True)
    username= db.Column(db.String(100), unique=True, nullable=False)
    email= db.Column(db.String(100), unique=True, nullable=False)
    password_ha= db.Column(db.String(1000), nullable=False)
    created_at= db.Column(db.DateTime, server_default=db.func.now())
    #updated_at= db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    def __repr__(self):
        return '<User %r>' % self.username

    


