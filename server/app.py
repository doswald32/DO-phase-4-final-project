#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import json
import ipdb
from flask import request, make_response, jsonify
from flask_restful import Resource
from datetime import datetime, date
from ipdb import set_trace

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Animal, Owner, Vet, Visit
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/animals')
def animals(): 
    animals = []
    for animal in Animal.query.all():
        new = animal.to_dict()
        animals.append(new)

    response = make_response(
        jsonify(animals),
        200
    )

    return response


@app.route('/animals/<int:id>')
def get_animal_by_id(id):
    animal = Animal.query.filter(Animal.id == id).first()
    animal_dict = animal.to_dict()

    response = make_response(jsonify(animal_dict), 200)

    return response


@app.route('/animals', methods=['POST'])
def create_animal():
    try: 
        data = request.get_json()

        dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()

        new_animal = Animal(
            name=data['name'],
            species=data['species'],
            dob=dob,
            vet_id=data['vet_id'],
        )

        for owner_id in data['owners']:
            owner = Owner.query.filter(Owner.id == owner_id).first()
            new_animal.owners.append(owner)

        new_visit = Visit(
            date=datetime.strptime(data['visits'][0]['date'], '%Y-%m-%d').date(),
            summary=data['visits'][0]['summary'],
            animal=new_animal
        )
        db.session.add(new_visit)

        db.session.add(new_animal)
        db.session.commit()

        return make_response(jsonify(new_animal.to_dict()), 201)
    
    except Exception as e:
        db.session.rollback()
        print(f"Error creating animal: {e}")  # Log the error
        return make_response({"error": str(e)}, 400)


@app.route('/animals/<int:id>', methods=['PATCH'])
def update_animal(id):
    data = request.json
    animal = Animal.query.filter_by(id=id).first()

    if not animal:
        return make_response({"error": "Animal not found"}, 404)

    try:
        # Update basic fields
        for key, value in data.items():
            if key == "dob":
                setattr(animal, "dob", datetime.strptime(value, '%Y-%m-%d').date())
            elif key not in ["owners", "visits"]:
                setattr(animal, key, value)

        # Update owners
        if "owners" in data:
            animal.owners.clear()
            for owner_id in data["owners"]:
                owner = Owner.query.get(owner_id)
                if owner:
                    animal.owners.append(owner)

        # Update visits
        if "visits" in data:
            for visit_data in data["visits"]:
                visit = Visit.query.filter_by(animal_id=animal.id).first()
                if visit:
                    visit.date = datetime.strptime(visit_data["date"], '%Y-%m-%d').date()
                    visit.summary = visit_data["summary"]

        db.session.commit()
        return make_response(jsonify(animal.to_dict()), 200)

    except Exception as e:
        db.session.rollback()
        print(f"Error updating animal: {e}")
        return make_response({"error": str(e)}, 400)


@app.route('/animals/<int:id>', methods=['DELETE'])
def delete_animal(id):
    animal = Animal.query.filter_by(id = id).first()
    db.session.delete(animal)
    db.session.commit()

    response_body = {"message": f"Animal {id} successfully deleted"}

    response = make_response(jsonify(response_body), 200)

    return response


@app.route('/owners')
def owners():
    owners = []
    for owner in Owner.query.all():
        new = owner.to_dict()
        owners.append(new)

    response = make_response(
        jsonify(owners),
        200
    )

    return response


@app.route('/owners', methods=['POST'])
def add_owner():
    data = request.json

    new_owner = Owner(
        first_name=data['firstName'],
        last_name=data['lastName']
    )

    db.session.add(new_owner)
    db.session.commit()

    return make_response(jsonify(new_owner.to_dict()), 201)


@app.route('/vets')
def vets():
    vets = []
    for vet in Vet.query.all():
        new = vet.to_dict()
        vets.append(new)

    response = make_response(
        jsonify(vets),
        200
    )

    return response


@app.route('/vets', methods=['POST'])
def add_vet():
    data = request.json

    hire_date = datetime.strptime(data['hireDate'], '%Y-%m-%d').date()

    new_vet = Vet(
        first_name=data['firstName'],
        last_name=data['lastName'],
        hire_date=hire_date
    )

    db.session.add(new_vet)
    db.session.commit()

    return make_response(jsonify(new_vet.to_dict()), 201)


@app.route('/visits')
def visits():
    visits = [visit.to_dict() for visit in Visit.query.all()]

    response = make_response(jsonify(visits), 200)

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

