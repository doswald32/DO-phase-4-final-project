from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime, date
from sqlalchemy_serializer import SerializerMixin

from config import db

animal_owners = db.Table(
    'animal_owners',
    db.Column('animal_id', db.Integer, db.ForeignKey('animals.id'), primary_key=True),
    db.Column('owner_id', db.Integer, db.ForeignKey('owners.id'), primary_key=True)
)

class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    serialize_rules = ('-visits.animal', '-owners.animals', '-vet.animals') 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    dob = db.Column(db.Date)
    species = db.Column(db.String)
    vet_id = db.Column(db.Integer, db.ForeignKey('vets.id'))

    vet = db.relationship('Vet', back_populates='animals')

    visits = db.relationship('Visit', back_populates='animal', cascade='all, delete-orphan')

    owners = db.relationship('Owner', secondary=animal_owners, back_populates='animals')


    def __repr__(self):
        return f'<Animal {self.id}, {self.name}, {self.dob}, {self.species}>'


class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    serialize_rules = ('-visits.owner', '-animals.owners',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    visits = association_proxy('animals', 'visits')

    animals = db.relationship('Animal', secondary=animal_owners, back_populates='owners')

    def __repr__(self):
        return f'<Owner {self.first_name} {self.last_name}>'
    

class Vet(db.Model, SerializerMixin):
    __tablename__ = 'vets'

    serialize_rules = ('-animals.vet', '-visits.vet')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    hire_date = db.Column(db.Date)

    animals = db.relationship('Animal', back_populates='vet')

    visits = association_proxy('animals', 'visits')

    def __repr__(self):
        return f'<Vet {self.id}, {self.first_name} {self.last_name}>'
    

class Visit(db.Model, SerializerMixin):
    __tablename__ = 'visits'

    serialize_rules = ('-animal.visits', '-owner.visits',)

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    summary = db.Column(db.String)

    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))

    animal = db.relationship('Animal', back_populates='visits')

    vet = association_proxy('animal', 'vet')

    def __repr__(self):
        return f'{self.date}'
    
