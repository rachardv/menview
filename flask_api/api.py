from flask import Flask, request
from flask_restful import reqparse, abort, Api, Resource
from models import Restaurant
from resources import RestaurantListResource, RestaurantResource
from waitress import serve

app = Flask(__name__)
api = Api(app)

# endpoints for requests go here

api.add_resource(RestaurantListResource, '/restaurants/', endpoint='restaurants')
api.add_resource(RestaurantResource, '/restaurants/<string:name>', endpoint='restaurant')  

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
