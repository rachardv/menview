from flask import Flask, request
from flask_cors import CORS
from flask_restful import reqparse, abort, Api, Resource
from models import Restaurant, User, Dish

from resources.restaurant_resource import RestaurantListResource, RestaurantResource
from  resources.dish_resource import DishListResource, DishResource
from resources.user_resource import UserListResource, UserResource
from resources.review_resource import ReviewListResource, ReviewResource
from waitress import serve
from flask_jwt_extended import JWTManager


from resources.user_resource import OauthLogin, UserRegistration, UserLogin, TokenRefresh, SecretResource

app = Flask(__name__)
CORS(app, origins="*", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    supports_credentials=True, intercept_exceptions=False)
api = Api(app)
jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = 'menview-secret-string'
app.config['PROPAGATE_EXCEPTIONS'] = True

# endpoints for requests go here

api.add_resource(RestaurantListResource, '/restaurants/', endpoint='restaurants')
api.add_resource(RestaurantResource, '/restaurants/<string:name>', endpoint='restaurant')  

api.add_resource(DishListResource, '/dishes/', endpoint='dishes')  
api.add_resource(DishResource, '/dishes/<string:dish_id>', endpoint='dish')  

api.add_resource(UserListResource, '/users/', endpoint='users')  
api.add_resource(UserResource, '/users/<string:username>', endpoint='user')  

api.add_resource(ReviewListResource, '/reviews/', endpoint='reviews')  
api.add_resource(ReviewResource, '/reviews/<string:review_id>', endpoint='review')  

# login/registration endpts

api.add_resource(UserRegistration, '/registration')
api.add_resource(UserLogin, '/login')
# api.add_resource(UserLogoutAccess, '/logout/access')
# api.add_resource(UserLogoutRefresh, '/logout/refresh')
api.add_resource(TokenRefresh, '/token/refresh')
api.add_resource(SecretResource, '/secret') #use this to test jwt validation
api.add_resource(OauthLogin, '/OauthLogin')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)
