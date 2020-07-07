from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User, Dog
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/get_user_dogs", methods=["GET"])
@requires_auth
def get_dogs():
    dog=Dog.query.filter_by(user_id=g.current_user["id"]).first()
    return jsonify(result=dog.breed)


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )

@app.route("/api/create_dog_entry", methods=["POST"])
def create_dog_entry():
    incoming = request.get_json()
    dog = Dog(
        name=incoming["name"],
        breed=incoming["breed"],
        user_id=incoming["user_id"]
    )
    db.session.add(dog)
    db.session.commit()
  
    # new_dog = Dog.query.filter_by(name=incoming["name"], breed=incoming["breed"], user_id=incoming["user_id"]).first()

    return jsonify(
        breed=dog.breed,
        name=dog.name
    )

@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
