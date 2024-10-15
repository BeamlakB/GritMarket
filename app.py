from flask import Flask, request, jsonify,render_template, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS, cross_origin
from Project import create_app
from Project.models import db, User
#app = Flask(__name__)

app = create_app()
bcrypt = Bcrypt(app) 
CORS(app, supports_credentials=True)
#server sided session enabled
server_session = Session(app)
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

    return jsonify({"id": user.id, "email": user.email, "user":user.username})


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



if __name__ == '__main__':
    app.run (debug=True)