from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

from config import db

class Pet(db.Model, SerializerMixin):
  __tablename__ = 'pets'

  serialize_rules = ('-visits.pet', '-vets.pets') 

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  dob = db.Column(db.Date, nullable=False)
  species = db.Column(db.String, nullable=False)

  visits = db.relationship('Visit', back_populates='pet', cascade='all, delete-orphan')

  vets = association_proxy('visits', 'vet', creator=lambda vet_obj: Visit(vet=vet_obj))

  def __repr__(self):
      return f'<Pet {self.id}, {self.name}, {self.dob}, {self.species}>'


class Vet(db.Model, SerializerMixin):
  __tablename__ = 'vets'

  serialize_rules = ('-pets.vet', '-visits.vet')

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String, nullable=False)
  last_name = db.Column(db.String, nullable=False)
  hire_date = db.Column(db.Date, nullable=False)

  visits = db.relationship('Visit', back_populates='vet', cascade='all, delete-orphan')

  pets = association_proxy('visits', 'pet', creator=lambda pet_obj: Visit(pet=pet_obj))

  def __repr__(self):
      return f'<Vet {self.id}, {self.first_name} {self.last_name} {self.hire_date}>'


class Visit(db.Model, SerializerMixin):
  __tablename__ = 'visits'

  serialize_rules = ('-pet.visits', '-vet.visits',)

  id = db.Column(db.Integer, primary_key=True)
  date = db.Column(db.Date, nullable=False)
  summary = db.Column(db.String, nullable=False)

  pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
  vet_id = db.Column(db.Integer, db.ForeignKey('vets.id'), nullable=False)

  pet = db.relationship('Pet', back_populates='visits')
  vet = db.relationship('Vet', back_populates='visits')

  def __repr__(self):
      return f'Visit {self.id}: Date: {self.date}, Summary: {self.summary} , Pet: {self.pet}, Vet {self.vet}'