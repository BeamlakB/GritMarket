from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager, current_user
from flask_bcrypt import Bcrypt
import logging
import os
from urllib.parse import quote_plus
import redis
from dotenv import load_dotenv
db= SQLAlchemy()
login_manger = LoginManager()
class ApplicationConfig:
    load_dotenv()
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_ECHO= True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SESSION_TYPE= "redis"
    SESSION_PERMANENT= False #SESSION ISN'T GOIGN TO BE PERM
    SESSION_USE_SIGNER= True
    SECRET_REDIS= redis.from_url("redis://127.0.0.1:6379")

def create_app():
    app = Flask(__name__)
    bcrypt = Bcrypt(app) 
    load_dotenv()
    # app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
    # app.config['MYSQL_USER'] =  os.getenv('MYSQL_HOST')
    # app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
    # app.config ["MYSQL_DB"]= os.getenv('MYSQL_DB')
    #establish connection with our database 
    #app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{quote_plus(os.getenv('MYSQL_PASSWORD'))}@{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DB')}"
    app.config.from_object(ApplicationConfig)
    
    db.init_app(app)

    with app.app_context():
        from .models import User
        from .models import Posts
        db.create_all()

        return app


