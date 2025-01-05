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


class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    def __repr__(self):
        return f'<Owner {self.first_name} {self.last_name}'
    

class Visit(db.Model, SerializerMixin):
    __tablename__ = 'visits'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)

    def __repr__(self):
        return f'{self.date}'
    
