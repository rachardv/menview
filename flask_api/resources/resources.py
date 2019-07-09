from flask import request
from models import Restaurant
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with


restaurant_fields = {
    'name': fields.String,
    'lat': fields.Integer,
    'lon': fields.Integer,
    'address': fields.String,
    'description': fields.String,
    'rating': fields.Integer
}





parser = reqparse.RequestParser()
#parse args for restaurant
parser.add_argument('name')
parser.add_argument('lat')
parser.add_argument('lon')
parser.add_argument('address')
parser.add_argument('description')
parser.add_argument('rating')




class RestaurantResource(Resource):
    @marshal_with(restaurant_fields)
    def get(self, name):
        restaurant = session.query(Restaurant).filter(Restaurant.name == name).first()
        if not restaurant:
            abort(404, message="restaurant {} doesn't exist".format(name))
        return restaurant

    def delete(self, name):
        restaurant = session.query(Restaurant).filter(Restaurant.name == name).first()
        if not restaurant:
            abort(404, message="restaurant {} doesn't exist".format(name))
        session.delete(restaurant)
        session.commit()
        return {}, 204

    @marshal_with(restaurant_fields)
    def put(self, name):
        parsed_args = parser.parse_args()
        restaurant = session.query(Restaurant).filter(Restaurant.name == name).first()
        restaurant.name = parsed_args['name']
        restaurant.description = parsed_args['description']
        restaurant.address = parsed_args['address']
        restaurant.rating = parsed_args['rating']
        restaurant.lat = parsed_args['lat']
        restaurant.lon = parsed_args['lon']
        session.add(restaurant)
        session.commit()
        return restaurant, 201


class RestaurantListResource(Resource):
    @marshal_with(restaurant_fields)
    def get(self):
        restaurants = session.query(Restaurant).all()
        return restaurants

    @marshal_with(restaurant_fields)
    def post(self):
        parsed_args = parser.parse_args()
        restaurant = Restaurant(name=parsed_args['name'], description=parsed_args['description'],
                    rating=parsed_args['rating'], address=parsed_args['address'],
                    lat=parsed_args['lat'], lon=parsed_args['lon'])
        session.add(restaurant)
        session.commit()
        return restaurant, 201
