from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

from config import db

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    DOB = db.Column(db.DateTime)
    species = db.Column(db.String)

    def __repr__(self):
        return f'<Animal {self.id}, {self.name}, {self.DOB}, {self.species}>'

