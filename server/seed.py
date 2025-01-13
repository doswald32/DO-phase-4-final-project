#!/usr/bin/env python3

# Standard library imports
from datetime import date

from sqlalchemy import text

# Local imports
from app import app
from models import db, Animal, Owner, Visit, Vet


if __name__ == '__main__':
    
    with app.app_context():
        print("Clearing database...")
        db.session.execute(text('DELETE FROM animal_owners'))
        Animal.query.delete()
        Vet.query.delete()
        Owner.query.delete()
        Visit.query.delete()
        db.session.commit()

        # Seed Vets
        print("Seeding vets...")
        vet1 = Vet(first_name="Dan", last_name="Oswald", hire_date=date(2020, 1, 1))
        vet2 = Vet(first_name="Hannah", last_name="Gangware", hire_date=date(2020, 1, 1))
        vets = [vet1, vet2]
        db.session.add_all(vets)
        db.session.commit()

        # Seed Animals
        print("Seeding animals...")
        a1 = Animal(name="Duncan", dob=date(2000, 11, 11), species="Dog", vet=vet1)
        a2 = Animal(name="Larry", dob=date(2000, 11, 11), species="Dog", vet=vet1)
        a3 = Animal(name="Lucy", dob=date(2000, 11, 11), species="Cat", vet=vet2)
        a4 = Animal(name="Trudy", dob=date(2000, 11, 11), species="Turtle", vet=vet2)
        a5 = Animal(name="Ethel", dob=date(2000, 11, 11), species="Cat", vet=vet2)
        animals = [a1, a2, a3, a4, a5]
        db.session.add_all(animals)
        db.session.commit()

        # Seed Owners
        print("Seeding owners...")
        o1 = Owner(first_name="David", last_name="Oswald")
        o2 = Owner(first_name="John", last_name="Smith")
        o3 = Owner(first_name="Carol", last_name="Stevens")
        o4 = Owner(first_name="Julie", last_name="Johnson")
        o5 = Owner(first_name="Adam", last_name="Farley")
        owners = [o1, o2, o3, o4, o5]
        db.session.add_all(owners)
        db.session.commit()

        # Associate Owners with Animals
        print("Associating owners with animals...")
        a1.owners.extend([o1, o2])  # Animal with two owners
        a2.owners.append(o3)        # Animal with one owner
        a3.owners.extend([o4, o5])  # Animal with two owners
        a4.owners.append(o1)        # Animal with one owner
        a5.owners.append(o2)        # Animal with one owner
        db.session.commit()

        # Seed Visits
        print("Seeding visits...")
        v1 = Visit(date=date(2024, 1, 1), summary="Annual check-up", animal=a1)
        v2 = Visit(date=date(2024, 6, 15), summary="Follow-up vaccination", animal=a1)
        v3 = Visit(date=date(2024, 1, 1), summary="Annual check-up", animal=a2)
        v4 = Visit(date=date(2024, 1, 1), summary="Annual check-up", animal=a3)
        v5 = Visit(date=date(2024, 1, 1), summary="Annual check-up", animal=a4)
        v6 = Visit(date=date(2024, 1, 1), summary="Annual check-up", animal=a5)
        visits = [v1, v2, v3, v4, v5, v6]
        db.session.add_all(visits)
        db.session.commit()

        print("Done seeding!")
