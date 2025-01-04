#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Animal
# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/animals')
def animals(): 

    animals = []
    for animal in Animal.query.all():
        animal_dict = {
            "id": animal.id,
            "name": animal.name,
            "DOB": animal.DOB,
            "species": animal.species,
        }
        animals.append(animal_dict)

        response = make_response(
            jsonify(animals),
            200
        )

        return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

