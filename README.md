# Menview

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

# Known Issues

+ Occasional HTTP 500 returned from server after repeated GET requests in quick succession.
+ Text overlap of restaurant list cards when resizing the window.


# Deployment Instructions

## For production:

Run the following command to deploy the application (front-end served through nginx) with docker-compose:
`docker-compose -f docker-compose-prod.yml up -d --build`

To instantiate DB with sample data, use the command `bash db_init.sh`. When prompted, use password `secret`.

You can access the app at [http://localhost:8080/](http://localhost:8080/). You will be redirected to `http://localhost:8080/#/` as this ensures proper page loads for Angular routes on nginx.

### For development:

Install Angular CLI 8.0.3 on your machine:
`npm install -g @angular/cli@8.0.3`

Run the following bash command (may take some time):

1. `docker-compose up -d --build`

You can now test the site in your web browser at `http://localhost:4201/`

To stop the container after you're done using it, enter:
2. `docker-compose stop`

To instantiate the database with data:
Initializing the database twice may cause problems, use `docker-compose down -v` to remove all volumes before continuing.

1. get the database container up and running via `docker-compose up -d --build`

2. run a seperate bash window in the menview directory 

3. type `bash db_init.sh`

4. type the password "secret" when promted 

Note that you can verify if you have successfully added the data by running: `docker exec -it menview_db_1 psql -U admin -W menviewdb` and checking if the users table exists via `\dt`.

The password is again "secret"

Because the database is set up in a semi-permanent volume you need to run `docker-compose down -v` to delete the database volume and remove any data. 


## Flask REST-API

1. run `python3 ./flask_api/models.py` to instantiate an empty database with correct tables. (This is temporary)

2. visit `http:0.0.0.0:5000/restaurants/` or `http://localhost:5000/restaurants/` You should be presented with empty brackets. Post requests can be made with curl to this address. 


Note: To run separately, can be commented out of docker-compose and ran as `python3 ./flask_api/api.py`  (I reccomend this during development).

## Using the Flask API

A list of endpoints can be found in flask_api/api.py
A database tables can be found in flask_api/models.py

1. `curl -d '{"name":"white spot", "rating":"3"}' -H "Content-Type: application/json" -X POST http://0.0.0.0:5000/restaurants/`

2. query via `0.0.0.0/restaurants/white spot` or similar GET request

3. Dishes endpoint MUST be queried with a restaurant_name `http://127.0.0.1:5000/dishes/?restaurant_name=burger%20king`
and have the option to be queried with a username to sort the returned dishes by user recommendation.

For example, `http://127.0.0.1:5000/dishes/?restaurant_name=burger%20king&username=austin` will return the menu items 
from burger king sorted by austin's recommendation with the first item being the most recommended item. 

4. Reviews endpoint MUST be queried with a username `http://127.0.0.1:5000/reviews/?username=bob`.

## Using JWT tokens

1. JWT tokens are meant to in the Authorization header and should always be prepended with "Bearer "

2. They are encoded with a payload that contains user identity. Copy and paste to see what is encoded: https://jwt.io/

#How to obtain a JWT Token

1. Create account if you have not created one already. 
Can be done through front end/sending POST with username, password, email to localhost:5000/registration

2. Login by sending POST to localhost:5000/login with user and password. Token in response payload

3. To verify if its a valid token go to localhost:5000/secret. 
Send POST with token as "Authroization" header.

#How to lock a flask API endpoint

1. Add the python decorator "@jwt_required" to flask resource. 
Sample can be seen in Secret Resource in user_resource.py




# Troubleshooting

**docker-compose:**

1. Force clear docker images:
`docker system prune --force -a`

2. Clear npm cache: `npm cache clean --force`

3. Run docker-compose build command: docker-compose up -d --build

**ng-serve:**

1. Clear npm cache: `npm cache clean --force`

2. Run npm install (may need sudo): `npm install`

3. Run ng serve: `ng serve`


Resources Used & Attribution
============================

Dockerization of the Angular layer uses the following tutorial and modifies code provided by [Michael Herman](https://mherman.org/blog/dockerizing-an-angular-app/) (development) and [Aslan Vatsaev](https://dev.to/avatsaev/create-efficient-angular-docker-images-with-multi-stage-builds-1f3n) (production).

Template code for authentication services and back-end integration is originally written by [Jason Watmore](https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial). The project repository can be cloned from [here](https://github.com/cornflourblue/angular-8-registration-login-example).


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


Known Issues
============

1. When running docker-compose build the python library `rake-nltk` will fail to build its wheel but will later be installed successfully. This has no observable effect on the built docker containers (that we know of). 


