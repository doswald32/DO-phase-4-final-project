#!/usr/bin/env python3

# Standard library imports
from datetime import date

# Local imports
from app import app
from models import db, Pet, Visit, Vet


if __name__ == '__main__':
    
    with app.app_context():
        print("Clearing database...")
        Pet.query.delete()
        Vet.query.delete()
        Visit.query.delete()
        db.session.commit()

        # Seed Vets
        print("Seeding vets...")
        vet1 = Vet(first_name="Dan", last_name="Oswald", hire_date=date(2020, 1, 1))
        vet2 = Vet(first_name="Hannah", last_name="Gangware", hire_date=date(2020, 1, 1))
        vets = [vet1, vet2]
        db.session.add_all(vets)
        db.session.commit()

        # Seed Pets
        print("Seeding pets...")
        p1 = Pet(name="Duncan", dob=date(2000, 11, 11), species="Dog")
        p2 = Pet(name="Larry", dob=date(2000, 11, 11), species="Dog")
        p3 = Pet(name="Lucy", dob=date(2000, 11, 11), species="Cat")
        p4 = Pet(name="Trudy", dob=date(2000, 11, 11), species="Turtle")
        p5 = Pet(name="Ethel", dob=date(2000, 11, 11), species="Cat")
        pets = [p1, p2, p3, p4, p5]
        db.session.add_all(pets)
        db.session.commit()

        # Seed Visits
        print("Seeding visits...")
        vis1 = Visit(date=date(2024, 1, 1), summary="Annual check-up", pet=p1, vet=vet1)
        vis2 = Visit(date=date(2024, 6, 15), summary="Follow-up vaccination", pet=p1, vet=vet2)
        vis3 = Visit(date=date(2024, 1, 1), summary="Annual check-up", pet=p2, vet=vet2)
        vis4 = Visit(date=date(2024, 1, 1), summary="Annual check-up", pet=p3, vet=vet2)
        vis5 = Visit(date=date(2024, 1, 1), summary="Annual check-up", pet=p4, vet=vet2)
        vis6 = Visit(date=date(2024, 1, 1), summary="Annual check-up", pet=p5, vet=vet2)
        visits = [vis1, vis2, vis3, vis4, vis5, vis6]
        db.session.add_all(visits)
        db.session.commit()

        print("Done seeding!")
