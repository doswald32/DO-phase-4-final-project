#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, date

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Animal, Owner, Visit, animal_owners

fake = Faker()

# start_date = datetime.strptime('2004-01-01', '%Y-%m-%d').date()
# end_date = datetime.strptime('2023-12-12', '%Y-%m-%d').date()

if __name__ == '__main__':
    
    with app.app_context():
        print("Clearing database...")
        db.session.query(animal_owners).delete()
        db.session.commit()
        Animal.query.delete()
        Owner.query.delete()
        Visit.query.delete()

        # Seed Animals
        print("Seeding animals...")
        a1 = Animal(
            name="Duncan",
            DOB=date(2000, 11, 11),
            species="Dog"
        )
        a2 = Animal(
            name="Larry",
            DOB=date(2000, 11, 11),
            # DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Dog"
        )
        a3 = Animal(
            name="Lucy",
            DOB=date(2000, 11, 11),
            # DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Cat"
        )
        a4 = Animal(
            name="Trudy",
            DOB=date(2000, 11, 11),
            # DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Turtle"
        )
        a5 = Animal(
            name="Ethel",
            DOB=date(2000, 11, 11),
            # DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Cat"
        )
        animals = [a1, a2, a3, a4, a5]
        db.session.add_all(animals)
        db.session.commit()

        #Seed Owners
        print("Seeding owners...")
        o1 = Owner(first_name="David", last_name="Oswald")
        o2 = Owner(first_name="John", last_name="Smith")
        o3 = Owner(first_name="Carol", last_name="Stevens")
        o4 = Owner(first_name="Julie", last_name="Johnson")
        o5 = Owner(first_name="Adam", last_name="Farley")
        owners = [o1, o2, o3, o4, o5]
        db.session.add_all(owners)
        db.session.commit()

        #Seed Visits
        print("Seeding visits...")
        v1 = Visit(date=date(2024, 1, 1), animal=a1, owner=o1)
        v2 = Visit(date=date(2024, 1, 1), animal=a2, owner=o2)
        v3 = Visit(date=date(2024, 1, 1), animal=a3, owner=o3)
        v4 = Visit(date=date(2024, 1, 1), animal=a4, owner=o4)
        v5 = Visit(date=date(2024, 1, 1), animal=a5, owner=o5)
        visits = [v1, v2, v3, v4, v5]
        db.session.add_all(visits)
        db.session.commit()

        #Add Owner(s) to Animal
        a1.owners.append(o1)
        a2.owners.append(o2)
        a3.owners.append(o3)
        a4.owners.append(o4)
        a5.owners.append(o5)
        db.session.commit()

        #Add Animals to Owner
        # o1.animals.append(a1)
        # o2.animals.append(a2)
        # o3.animals.append(a3)
        # o4.animals.append(a4)
        # o5.animals.append(a5)
        # db.session.commit()

        print("Done seeding!")
