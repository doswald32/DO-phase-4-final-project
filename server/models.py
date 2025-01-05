from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

from config import db

animal_owners = db.Table('animal_owners',
    db.Column('animal_id', db.Integer, db.ForeignKey('animals.id'), primary_key=True),
    db.Column('owner.id', db.Integer, db.ForeignKey('owners.id'), primary_key=True)
)

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    DOB = db.Column(db.Date)
    species = db.Column(db.String)

    visits = db.relationship('Visit', back_populates='animal', cascade='all, delete-orphan')
    owners = db.relationship('Owner', secondary=animal_owners, back_populates='animals')

    def __repr__(self):
        return f'<Animal {self.id}, {self.name}, {self.DOB}, {self.species}>'


class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    visits = db.relationship('Visit', back_populates='owner', cascade='all, delete-orphan')
    animals = db.relationship('Animal', secondary=animal_owners, back_populates='owners')

    def __repr__(self):
        return f'<Owner {self.first_name} {self.last_name}'
    

class Visit(db.Model, SerializerMixin):
    __tablename__ = 'visits'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)

    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))

    animal = db.relationship('Animal', back_populates='visits')
    owner = db.relationship('Owner', back_populates='visits')

    def __repr__(self):
        return f'{self.date}'
    
