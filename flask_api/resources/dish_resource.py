from flask import request
from models import Dish, Review
from db import session
from recommender import recommend
from flask_restful import reqparse, abort, Resource, fields, marshal_with

dish_fields = {
    'dish_name': fields.String,
    'dish_description': fields.String,
    'dish_rating': fields.Integer,
    'dish_id': fields.Integer,
    'restaurant_name': fields.String
}


parser = reqparse.RequestParser()


#parse args for dishes                                                                                                              
parser.add_argument('dish_id')
parser.add_argument('dish_rating')
parser.add_argument('dish_name')
parser.add_argument('dish_description')
parser.add_argument('restaurant_name')
parser.add_argument('username')

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
        dish.dish_id = parsed_args['dish_id']
        dish.dish_description = parsed_args['dish_description']
        dish.dish_name = parsed_args['dish_name']
        dish.dish_rating = parsed_args['dish_rating']
        dish.restaurant_name = parsed_args['restaurant_name']
        session.add(dish)
        session.commit()
        return dish, 201



class DishListResource(Resource):
    @marshal_with(dish_fields)
    def get(self):
        parsed_args = parser.parse_args()
        restaurant_name = parsed_args['restaurant_name']
        dishes = session.query(Dish).filter(Dish.restaurant_name == restaurant_name).all()

        # return recommended dish's back if a user is specified AND they have atleast one review  
        username = parsed_args['username']
        if(username != 'None'):
            reviewed_dishes = session.query(Dish, Review).join(Review).filter(Review.username == username).all()
            if reviewed_dishes:
                dishes = recommend(dishes, reviewed_dishes)

        return dishes

    @marshal_with(dish_fields)
    def post(self):
        parsed_args = parser.parse_args()
        dish = Dish(dish_name=parsed_args['dish_name'], dish_description=parsed_args['dish_description'],
                    dish_rating=parsed_args['dish_rating'], dish_id=parsed_args['dish_id'], restaurant_name=parsed_args['restaurant_name'])
                   
        session.add(dish)
        session.commit()
        return dish, 201
