#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import json
import ipdb
from flask import request, jsonify, make_response
from flask_restful import Resource, Api, abort
from datetime import datetime
from config import app, db, api
from models import Pet, Vet, Visit

api = Api(app)


def handle_not_found(resource, resource_id):
    abort(404, message=f"{resource} with ID {resource_id} not found")

def handle_error(message):
    return jsonify({"error": message}), 400


class IndexResource(Resource):
    def get(self):
        return {"message": "Project Server"}, 200


class PetResource(Resource):
    def get(self, id=None):
        if id is None:
            pets = [pet.to_dict() for pet in Pet.query.all()]
            return make_response(pets, 200)
        else:
            pet = Pet.query.filter(Pet.id == id).first()
            if not pet:
                handle_not_found("Pet", id)
            return make_response(pet.to_dict(), 200)

    def post(self):
        try:
            data = request.get_json()
            dob = datetime.strptime(data["dob"], "%Y-%m-%d").date()
            new_pet = Pet(
                name=data["name"],
                species=data["species"],
                dob=dob,
            )

            db.session.add(new_pet)
            db.session.commit()

            return make_response(new_pet.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error creating pet: {str(e)}")

    def patch(self, id):
        pet = Pet.query.filter(Pet.id == id).first()
        if not pet:
            handle_not_found("Pet", id)

        try:
            data = request.get_json()
            for key, value in data.items():
                if key == "dob":
                    setattr(pet, "dob", datetime.strptime(value, "%Y-%m-%d").date())
                elif key not in ["owners", "visits"]:
                    setattr(pet, key, value)

            if "owners" in data:
                pet.owners.clear()
                for owner_id in data["owners"]:
                    owner = Owner.query.filter(Owner.id == owner_id).first()
                    if not owner:
                        handle_not_found("Owner", owner_id)
                    pet.owners.append(owner)

            if "visits" in data:
                for visit_data in data["visits"]:
                    visit = Visit.query.filter_by(pet_id=pet.id).first()
                    if visit:
                        visit.date = datetime.strptime(visit_data["date"], "%Y-%m-%d").date()
                        visit.summary = visit_data["summary"]

            db.session.commit()
            return pet.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error updating pet: {str(e)}")

    def delete(self, id):
        pet = Pet.query.filter(Pet.id == id).first()
        if not pet:
            handle_not_found("Pet", id)

        db.session.delete(pet)
        db.session.commit()
        return {"message": f"Pet {id} successfully deleted"}, 200


class VetResource(Resource):
    def get(self, id=None):
        if id is None:
            vets = [vet.to_dict() for vet in Vet.query.all()]
            return make_response(vets, 200)
        else:
            vet = Vet.query.filter(Vet.id == id).first()
            if not vet:
                handle_not_found("Pet", id)
            return make_response(vet.to_dict(), 200)

    def post(self):
        try:
            data = request.get_json()
            hire_date = datetime.strptime(data["hire_date"], "%Y-%m-%d").date()
            new_vet = Vet(
                first_name=data["first_name"],
                last_name=data["last_name"],
                hire_date=hire_date
            )

            db.session.add(new_vet)
            db.session.commit()

            return make_response(new_vet.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error creating vet: {str(e)}")

class VisitResource(Resource):
    def get(self, id=None):
        if id is None:
            visits = [visit.to_dict() for visit in Visit.query.all()]
            return make_response(visits, 200)
        else: 
            visit = Visit.query.filter(Visit.id == id).first()
            if not visit:
                handle_not_found("Pet", id)
            return make_response(visit.to_dict(), 200)

    def delete(self, id):
        visit = Visit.query.filter(Visit.id == id).first()
        if not visit:
            handle_not_found("Pet", id)

        db.session.delete(visit)
        db.session.commit()
        return {"message": f"Visit {id} successfully deleted"}, 200

api.add_resource(IndexResource, "/")
api.add_resource(PetResource, "/pets", "/pets/<int:id>")
api.add_resource(VetResource, "/vets", "/vets/<int:id>")
api.add_resource(VisitResource, "/visits", "/visits/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)