#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Animal

fake = Faker()

def create_animals():
    start_date = datetime.strptime('2004-01-01', '%Y-%m-%d').date()
    end_date = datetime.strptime('2023-12-12', '%Y-%m-%d').date()

    animals = [
        Animal(
            name="Duncan",
            DOB=datetime.date(2011, 9, 24),
            species="Dog",
            owner="Ron Swanson",
            last_visit=datetime.date(2024, 12, 5)
        ),
        Animal(
            name="Larry",
            DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Dog", 
            owner="Ron Swanson",
            last_visit=datetime.date(2024, 12, 5)
        ),
        Animal(
            name="Lucy",
            DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Cat", 
            owner="Ron Swanson",
            last_visit=datetime.date(2024, 12, 5)
        ),
        Animal(
            name="Trudy",
            DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Turtle", 
            owner="Ron Swanson",
            last_visit=datetime.date(2024, 12, 5)
        ),
        Animal(
            name="Ethel",
            DOB=fake.date_between(start_date=start_date, end_date=end_date),
            species="Cat", 
            owner="Ron Swanson",
            last_visit=datetime.date(2024, 12, 5)
        ),
    ]

    return animals

if __name__ == '__main__':
    
    with app.app_context():
        print("Clearing database...")
        Animal.query.delete()

        print("Seeding animals...")
        animals = create_animals()
        db.session.add_all(animals)
        db.session.commit()

        print("Done seeding!")
