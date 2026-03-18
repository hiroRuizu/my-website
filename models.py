from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    subscription = db.relationship('Subscription', backref='user', uselist=False)

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.String(50), nullable=False, default='None')
    status = db.Column(db.String(20), nullable=False, default='inactive')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)