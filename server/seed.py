#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Dog

def create_dogs():
    dogs = []
    for _ in range(10):
        dog = Dog(name=fake.name(), DOB=faker.date.between({ from: '2012-01-01', to: Date.now() })
                  )

if __name__ == '__main__':
    
    fake = Faker()
    
    with app.app_context():
        print("Clearing database...")
        Dog.query.delete()

        print("Seeding dogs...")
        dogs = 
