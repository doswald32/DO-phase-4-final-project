# Dan's Phase 4 Final Project

## Overview

Welcome! This application is intended to track pet visits at a local animal hospital. 

## Access

To get started, fork and clone the repository. Once in the directory, you'll notice both /client and /server folders. These represent the front and back end of the application. Fisrt, enter pipenv install && pipenv shell to enter the virtual environment. 

To open the client, enter the client folder and type npm install and then npm start. 

Re-enter the server directory. Once in the server directory, enter the following:
    - export FLASK_APP=app.py
	- export FLASK_RUN_PORT=5555
	- flask db upgrade to generate the database
	- python seed.py to seed the database
	- python app.py to run the server

In the client, you'll see the home page which outlines instructions on how to use the application. 

Enjoy

