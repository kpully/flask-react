from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import BaseConfig
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_avatars import Avatars



app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(BaseConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)
avatars = Avatars(app)

