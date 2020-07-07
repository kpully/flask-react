from index import db, bcrypt, ma


class User(db.Model):
    __tablename__='users' 
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        self.email = email
        self.active = True
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

class Dog(db.Model):
    __tablename__='dogs'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(255))
    breed=db.Column(db.String(255))
    user_id=db.Column(db.Integer(),db.ForeignKey('users.id'))

    def __init__(self,name,breed, user_id):
        self.name=name
        self.breed=breed
        self.user_id=user_id

class DogSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("name", "breed", "id")

dog_schema=DogSchema()
dogs_schema = DogSchema(many=True)