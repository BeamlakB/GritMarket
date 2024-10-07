from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager, current_user
import logging
import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
db= SQLAlchemy()
login_manger = LoginManager()

def create_app():
    app = Flask(__name__)

    load_dotenv()
    app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
    app.config['MYSQL_USER'] =  os.getenv('MYSQL_HOST')
    app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
    app.config ["MYSQL_DB"]= os.getenv('MYSQL_DB')
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{quote_plus(os.getenv('MYSQL_PASSWORD'))}@{os.getenv('MYSQL_HOST')}/{os.getenv('MYSQL_DB')}"
    print (app.config['SQLALCHEMY_DATABASE_URI'] )
    
    db.init_app(app)

    with app.app_context():
        from .models import User
        db.create_all()

        return app


