# coding=utf-8
import string
import random
import time
import hmac

from flask.ext.login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from app import db
from app import login_manager


class User(UserMixin, db.Model):
    """users data table"""
    __tablename__ = 'yy_users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    open_id = db.Column(db.Text)
    user_name = db.Column(db.Text)
    access_token = db.Column(db.Text)
    user_pass = db.Column(db.Text)

    @staticmethod
    def random_password():
        s = ''.join(random.choice(string.ascii_lowercase+string.digits) for _ in range(12))
        return s

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.user_pass = generate_password_hash(password)

    @classmethod
    def insert_social_user(cls, open_id, user_name, access_token):
        user = User.query.filter_by(open_id=open_id).first()
        if not user:
            user = User(open_id=open_id)
            user.password = User.random_password()
        user.access_token = access_token
        user.user_name = user_name
        db.session.add(user)
        db.session.commit()
        return user

    def __repr__(self):
        return '<Open-User: %r>' % self.open_id


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class Option(db.Model):
    """website options table"""
    __tablename__ = 'yy_options'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    option_name = db.Column(db.Text, unique=True)
    option_value = db.Column(db.Text)

    @staticmethod
    def get_option(option_name):
        option = Option.query.filter_by(option_name=option_name).first()
        if option:
            return option.option_value
        return None

    @staticmethod
    def set_option(option_name, option_value):
        option = Option.query.filter_by(option_name=option_name).first()
        if not option:
            option = Option(option_name=option_name)
        option.option_value = option_value
        db.session.add(option)
        db.session.commit()

    def __repr__(self):
        return '<Option: %r>' % self.option_name


def generate_sign(app_key, app_secret, timestamp, redirect):
    s = str(app_key)+str(timestamp)+redirect
    h = hmac.new(app_secret)
    h.update(s)
    return h.hexdigest()
