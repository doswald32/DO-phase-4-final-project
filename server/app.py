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
                vet_id=data["vet_id"]
            )
            for owner_id in data.get("owners", []):
                owner = Owner.query.get(owner_id)
                if not owner:
                    handle_not_found("Owner", owner_id)
                new_pet.owners.append(owner)

            for visit in data.get("visits", []):
                new_visit = Visit(
                    date=datetime.strptime(visit["date"], "%Y-%m-%d").date(),
                    summary=visit["summary"],
                    pet=new_pet
                )
                db.session.add(new_visit)

            db.session.add(new_pet)
            db.session.commit()

            return new_pet.to_dict(), 201
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
    def get(self):
        vets = [vet.to_dict() for vet in Vet.query.all()]
        return vets, 200

    def post(self):
        try:
            data = request.get_json()
            hire_date = datetime.strptime(data["hireDate"], "%Y-%m-%d").date()
            new_vet = Vet(
                first_name=data["firstName"], last_name=data["lastName"], hire_date=hire_date
            )
            db.session.add(new_vet)
            db.session.commit()
            return new_vet.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error creating vet: {str(e)}")


class VisitResource(Resource):
    def get(self):
        visits = [visit.to_dict() for visit in Visit.query.all()]
        return visits, 200


api.add_resource(IndexResource, "/")
api.add_resource(PetResource, "/pets", "/pets/<int:id>")
api.add_resource(VetResource, "/vets")
api.add_resource(VisitResource, "/visits")

if __name__ == "__main__":
    app.run(port=5555, debug=True)