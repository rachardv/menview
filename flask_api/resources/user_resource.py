from flask import request
from models import User
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with


user_fields = {
    'username': fields.String,
    'email': fields.String,
    'password': fields.Integer
}

parser = reqparse.RequestParser()


#parse args for user                                                                                                                                                                 
parser.add_argument('username')
parser.add_argument('email')
parser.add_argument('password')




class UserResource(Resource):
    @marshal_with(user_fields)
    def get(self, name):
        user = session.query(User).filter(User.name == name).first()
        if not user:
            abort(404, message="user {} doesn't exist".format(name))
        return user

    def delete(self, name):
        user = session.query(User).filter(User.name == name).first()
        if not user:
            abort(404, message="user {} doesn't exist".format(name))
        session.delete(user)
        session.commit()
        return {}, 204

    @marshal_with(user_fields)
    def put(self, name):
        parsed_args = parser.parse_args()
        user = session.query(User).filter(User.name == name).first()
        user.name = parsed_args['name']
        user.description = parsed_args['description']
        user.address = parsed_args['address']
        user.rating = parsed_args['rating']
        user.lat = parsed_args['lat']
        user.lon = parsed_args['lon']
        session.add(user)
        session.commit()
        return user, 201



class UserListResource(Resource):
    @marshal_with(user_fields)
    def get(self):
        users = session.query(User).all()
        return users

    @marshal_with(user_fields)
    def post(self):
        parsed_args = parser.parse_args()
        user = User(name=parsed_args['name'], description=parsed_args['description'],
                    rating=parsed_args['rating'], address=parsed_args['address'],
                    lat=parsed_args['lat'], lon=parsed_args['lon'])
        session.add(user)
        session.commit()
        return user, 201

