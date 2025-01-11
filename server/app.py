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


@app.route('/animals', methods=['POST'])
def create_animal():
    try: 
        data = request.get_json()

        dob = datetime.strptime(data['dob'], '%Y-%m-%d').date()

        new_animal = Animal(
            name=data['name'],
            species=data['species'],
            DOB=dob,
            vet_id=data['vet_id'],
        )

        if 'owners' in data and 'visits' in data:
            for visit in data['visits']:
                owner_id = int(data['owners'][0])
                visit_date = datetime.strptime(visit['date'], '%Y-%m-%d').date()
                new_visit = Visit(
                    date=visit_date,
                    summary=visit['summary'],
                    animal=new_animal,
                    owner_id=owner_id
                )
                db.session.add(new_visit)

        db.session.add(new_animal)
        db.session.commit()

        return make_response(jsonify(new_animal.to_dict()), 201)
    
    except Exception as e:
        db.session.rollback()
        print(f"Error creating animal: {e}")  # Log the error
        return make_response({"error": str(e)}, 400)
    
@app.route('/animals/<int:id>')
def get_animal_by_id(id):
    animal = Animal.query.filter(Animal.id == id).first()
    animal_dict = animal.to_dict()

    response = make_response(jsonify(animal_dict), 200)

    return response

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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

