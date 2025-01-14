#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import json
import ipdb
from flask import request, jsonify, make_response
from flask_restful import Resource, Api, abort
from datetime import date, datetime
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


class VetResource(Resource):
    def get(self, id=None):
        if id is None:
            vets = [vet.to_dict() for vet in Vet.query.all()]
            return make_response(vets, 200)
        else:
            vet = Vet.query.filter(Vet.id == id).first()
            if not vet:
                handle_not_found("Vet", id)
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
                handle_not_found("Visit", id)
            return make_response(visit.to_dict(), 200)
        
    def post(self):
        try:
            data = request.get_json()
            visit_date = datetime.strptime(data["visit_date"], "%Y-%m-%d").date()
            new_visit = Visit(
                date=visit_date,
                summary=data["visit_summary"],
                pet_id=int(data['pet']),
                vet_id=int(data['vet'])
            )

            db.session.add(new_visit)
            db.session.commit()

            return make_response(new_visit.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error creating visit: {str(e)}")

    def patch(self, id):
        visit = Visit.query.filter(Visit.id == id).first()
        if not visit:
            return handle_not_found("Visit", id)
        
        try:
            data = request.get_json()
            visit.date = datetime.strptime(data['visit_date'], "%Y-%m-%d").date()
            visit.summary = data['visit_summary']
            visit.pet_id = data['pet_id']
            visit.vet_id = data['vet_id']

            db.session.commit()

            return jsonify(visit.to_dict(), 200)

        except Exception as e:
            db.session.rollback()
            return handle_error(f"Error updating visit: {str(e)}")

    def delete(self, id):
        visit = Visit.query.filter(Visit.id == id).first()
        if not visit:
            handle_not_found("Visit", id)

        db.session.delete(visit)
        db.session.commit()
        return {"message": f"Visit {id} successfully deleted"}, 200


api.add_resource(IndexResource, "/")
api.add_resource(PetResource, "/pets", "/pets/<int:id>")
api.add_resource(VetResource, "/vets", "/vets/<int:id>")
api.add_resource(VisitResource, "/visits", "/visits/<int:id>")

if __name__ == "__main__":
    app.run(port=5555, debug=True)