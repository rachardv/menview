from flask import request
from models import Restaurant
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with

dish_fields = {
    'dish_name': fields.String,
    'dish_description': fields.String,
    'dish_rating': fields.Integer,
    'dish_id': fields.Integer,
    'retaurant_name': fields.String
}


parser = reqparse.RequestParser()



#parse args for dishes                                                                                                              
parser.add_argument('dish_id')
parser.add_argument('dish_rating')
parser.add_argument('dish_name')
parser.add_argument('dish_description')
parser.add_argument('restaurant_name')

class DishResource(Resource):
    @marshal_with(dish_fields)
    def get(self, dish_id):
        dish = session.query(Dish).filter(Dish.dish_id == dish_id).first()
        if not dish:
            abort(404, message="dish {} doesn't exist".format(dish_id))
        return dish

    def delete(self, dish_id):
        dish = session.query(Dish).filter(Dish.dish_id == dish_id).first()
        if not dish:
            abort(404, message="dish {} doesn't exist".format(dish_id))
        session.delete(dish)
        session.commit()
        return {}, 204

    @marshal_with(dish_fields)
    def put(self, dish_id):
        parsed_args = parser.parse_args()
        dish = session.query(Dish).filter(Dish.dish_id == dish_id).first()
        dish.name = parsed_args['na']
        dish.description = parsed_args['description']
        dish.address = parsed_args['address']
        dish.rating = parsed_args['rating']
        dish.lat = parsed_args['lat']
        dish.lon = parsed_args['lon']
        session.add(dish)
        session.commit()
        return dish, 201



class DishListResource(Resource):
    @marshal_with(restaurant_fields)
    def get(self):
        restaurants = session.query(Restaurant).all()
        return restaurants

    @marshal_with(restaurant_fields)
    def post(self):
        parsed_args = parser.parse_args()
        dish = Restaurant(name=parsed_args['name'], description=parsed_args['description'],
                    rating=parsed_args['rating'], address=parsed_args['address'],
                    lat=parsed_args['lat'], lon=parsed_args['lon'])
        session.add(dish)
        session.commit()
        return dish, 201
