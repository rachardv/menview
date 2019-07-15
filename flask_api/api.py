from flask import Flask, request
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource
from models import Restaurant, User, Dish

from resources.restaurant_resource import RestaurantListResource, RestaurantResource
from  resources.dish_resource import DishListResource, DishResource
from resources.user_resource import UserListResource, UserResource
from resources.review_resource import ReviewListResource, ReviewResource
from waitress import serve

app = Flask(__name__)
CORS(app, origins="*", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    supports_credentials=True, intercept_exceptions=False)
api = Api(app)

# endpoints for requests go here

api.add_resource(RestaurantListResource, '/restaurants/', endpoint='restaurants')
api.add_resource(RestaurantResource, '/restaurants/<string:name>', endpoint='restaurant')  

api.add_resource(DishListResource, '/dishes/', endpoint='dishes')  
api.add_resource(DishResource, '/dishes/<string:dish_id>', endpoint='dish')  

api.add_resource(UserListResource, '/users/', endpoint='users')  
api.add_resource(UserResource, '/users/<string:username>', endpoint='user')  

api.add_resource(ReviewListResource, '/reviews/', endpoint='reviews')  
api.add_resource(ReviewResource, '/reviews/<string:review_id>', endpoint='review')  

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
