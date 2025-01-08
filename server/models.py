from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime, date
from sqlalchemy_serializer import SerializerMixin

from config import db


class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    serialize_rules = ('-visits.animal', '-owners.animals', '-vet.animals') 

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    DOB = db.Column(db.Date)
    species = db.Column(db.String)
    vet_id = db.Column(db.Integer, db.ForeignKey('vets.id'))

    visits = db.relationship('Visit', back_populates='animal')

    vet = db.relationship('Vet', back_populates='animals')

    owners = association_proxy('visits', 'owner', creator=lambda owner_obj: Visit(owner=owner_obj))


    def __repr__(self):
        return f'<Animal {self.id}, {self.name}, {self.DOB}, {self.species}>'


class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    serialize_rules = ('-visits.owner', '-animals.owners',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    visits = db.relationship('Visit', back_populates='owner', cascade='all, delete-orphan')

    animals = association_proxy('visits', 'animal', creator=lambda animal_obj: Visit(animal=animal_obj))

    def __repr__(self):
        return f'<Owner {self.first_name} {self.last_name}>'
    

class Vet(db.Model, SerializerMixin):
    __tablename__ = 'vets'

    serialize_rules = ('-animals.vet', '-animals.visits')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    hire_date = db.Column(db.Date)

    animals = db.relationship('Animal', back_populates='vet')

    visits = association_proxy('animals', 'visits', creator=lambda visit_obj: Animal(visit=visit_obj))

    def __repr__(self):
        return f'<Vet {self.id}, {self.first_name} {self.last_name}>'
    

class Visit(db.Model, SerializerMixin):
    __tablename__ = 'visits'

    serialize_rules = ('-animal.visits', '-owner.visits',)

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    summary = db.Column(db.String)

    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))

    animal = db.relationship('Animal', back_populates='visits')

    owner = db.relationship('Owner', back_populates='visits')

    vet = association_proxy('animal', 'vet', creator=lambda vet_obj: Animal(vet=vet_obj))

    def __repr__(self):
        return f'{self.date}'
    
