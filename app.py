from flask import Flask, request, jsonify,render_template, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS, cross_origin
from Project import create_app
from Project.models import db, User
from datetime import datetime
from Project.models import db, Posts
import os
from werkzeug.utils import secure_filename
import logging

#app = Flask(__name__)

app = create_app()
app.config['MAX_CONTENT_LEN'] = 16*1024*1024
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
#server sided session enabled
server_session = Session(app)

logging.basicConfig(level=logging.DEBUG)  # You can use DEBUG, INFO, WARNING, ERROR, CRITICAL
logger = logging.getLogger(__name__)

@app.route('/', methods=['Get'])
def home():
    return render_template ("index.html")

@app.route('/AvoidScams.html', methods=['Get'])
def about():
    return render_template ("AvoidScams.html")

@app.route('/Support.html', methods=['Get'])
def support():
    return render_template ("Support.html")

@app.route('/FrequentlyAskedQuestions.html', methods=['Get'])
def FrequentlyAskedQuestions():
    return render_template ("FrequentlyAskedQuestions.html")

@app.route('/PersonalSafetyTips.html', methods=['Get'])
def Safteytips():
    return render_template ("PersonalSafetyTips.html")

#return info abourt curr logged in user
@app.route ("/@me")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user= User.query.filter_by(id=user_id).first()

    if user:
        return jsonify({"id": user.id, "email": user.email, "user":user.username})
    else:
        return jsonify({"error", "User not found"}), 404


@app.route ("/signup", methods= ['POST'])
def signup ():
    email= request.json["email"]
    password= request.json["password"]
    username3= request.json["username"]

    user_exists= User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exisits"}, 409)
    hashed_password = bcrypt.generate_password_hash(password)
    new_user= User (email=email, password_ha=hashed_password, username=username3)
    db.session.add(new_user)
    db.session.commit()
    #log in when registered 
    session["user_id"]= new_user.id

    return jsonify({"id": new_user.id, "email": new_user.email})

@app.route("/login", methods=["POST"])
def login_user():
    password= request.json["password"]
    email= request.json["email"]

    user= User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Unauthorized user dne"}), 401
    if not bcrypt.check_password_hash (user.password_ha, password):
        return jsonify({"error": "Unauthorized password"}),401
    #creates a cookie 
    session["user_id"]= user.id
    return jsonify({"id": user.id, "email": user.email}), 200

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


#check file extensions are valid
def allowed_ext(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/add-post', methods=['POST'])
def add_post():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    #get form data
    data = request.form
    image_file = request.files.get("file")
    if not image_file:
        return jsonify({"error": "File not provided"}), 400
    
    image_Preview = request.form.get("imagePreview")
    main_Category = data.get("mainCategory")
    sub_Category = data.get("subCategory")
    title = data.get("title")
    price = data.get("price")
    description = data.get("description")

    if not title or not price or not description:
        return jsonify({"error": "Missing required fields"}), 400

    #save image file
    if not image_file or not allowed_ext(image_file.filename):
        return jsonify({"error": "Invalid image file"}), 400
    
    filename = secure_filename(image_file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    print(f"Saving file to: {filepath}")  # Debugging
    image_file.save(filepath)

    
    #Post Object
    new_Post = Posts(
        imagePath = filepath,
        imagePreview = image_Preview,
        mainCategory = main_Category,
        subCategory = sub_Category,
        title = title,
        price = price, 
        description = description,
        author = "User{}".format(user_id) #This makes the posts the logged in user
    ) 

    #Add data to table
    db.session.add(new_Post)
    db.session.commit()

    return jsonify({"success": True}), 200

@app.route('/profile', methods=['GET'])
def my_Profile():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthroized"}), 401
    
    #Grabs posts from the database
    posts = Posts.query.filter_by(author=f"User{user_id}").order_by(Posts.date_posted)
    post_data = [{
        "id": post.id,
        "imagePath": post.imagePath,
        "imagePreview": post.imagePreview,
        "mainCategory": post.mainCategory,
        "subCategory": post.subCategory,
        "title": post.title,
        "price": post.price,
        "description": post.description,
        "date_posted": post.date_posted

    } for post in posts]
    return jsonify(post_data)


if __name__ == '__main__':
    app.run (debug=True)