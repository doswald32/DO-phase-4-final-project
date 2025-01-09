#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Animal, Owner, Vet
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)

