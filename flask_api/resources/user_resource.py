from flask import request
from models import User
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with


user_fields = {
    'username': fields.String,
    'email': fields.String,
    'password': fields.String
#    'file': fields.String
}

parser = reqparse.RequestParser()


#parse args for user                                                                                                                                                                 
parser.add_argument('username')
parser.add_argument('email')
parser.add_argument('password')
#parser.add_argument('file')




class UserResource(Resource):
    @marshal_with(user_fields)
    def get(self, username):
        user = session.query(User).filter(User.username == username).first()
        if not user:
            abort(404, message="user {} doesn't exist".format(username))
        return user

    def delete(self, username):
        user = session.query(User).filter(User.username == username).first()
        if not user:
            abort(404, message="user {} doesn't exist".format(username))
        session.delete(user)
        sessioncommit()
        return {}, 204

    @marshal_with(user_fields)
    def put(self, username):
        parsed_args = parser.parse_args()
        user = session.query(User).filter(User.username == username).first()
        user.username = parsed_args['username']
        user.email = parsed_args['email']
        user.password = parsed_args['password']
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
        user = User(username=parsed_args['username'], email=parsed_args['email'],
                    password=parsed_args['password'])
        session.add(user)
        session.commit()
        return user, 201

