from flask import request, jsonify, make_response
from models import User
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with
from passlib.hash import pbkdf2_sha256 as sha256
from flask_jwt_extended import (create_access_token, 
                                create_refresh_token, 
                                jwt_required, 
                                jwt_refresh_token_required, 
                                get_jwt_identity,
                                JWTManager)

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
        session.commit()
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


# resources for login

class UserRegistration(Resource): #this post resource is only for regular registration
    def post(self): 
        try: 
            parsed_args = parser.parse_args()

            user = User(
            username=parsed_args['username'], 
            email=parsed_args['email'],
            password=sha256.hash(parsed_args['password'])
            )

            #check is user exists
            if session.query(User).filter(User.username == parsed_args['username']).first():
                raise Exception("Username {} already exists".format(parsed_args['username']))

            #generate tokens
            access_token = create_access_token(identity = parsed_args['username'])
            refresh_token = create_refresh_token(identity = parsed_args['username'])
            #save to db
            session.add(user)
            session.commit()

        except Exception as e:
            return {'Error Message': 'User failed to be registered',
                    'Reason': '{}'.format(e)}, 409
                    
        return {'Message':'User {} successfully registered'.format(user.username),
                'username':  user.username,
                'access_token': access_token,
                'refresh_token': refresh_token
                }, 201

class UserLogin(Resource):
    def post(self):
        try: 
            parsed_args = parser.parse_args()   
            #check if user exists
            user = session.query(User).filter(User.username == parsed_args['username']).first()
            if not user:
                raise Exception("Username {} does not exists".format(parsed_args['username']))

            if sha256.verify(parsed_args['password'], user.password): #password is hashed (SHA256)
                #generate tokens
                access_token = create_access_token(identity = parsed_args['username'])
                refresh_token = create_refresh_token(identity = parsed_args['username'])
                #return
                return {'message': 'Logged in as {}'.format(user.username),
                        'username': user.username,
                        'access_token': access_token,
                        'refresh_token': refresh_token}, 200
            else:
                raise Exception("Credentials don't match")

        except Exception as e:
            return {'Error Message': 'User failed to login',
                    'Reason': '{}'.format(e)}, 401

class SecretResource(Resource): 
    @jwt_required    #an example on how to lock resources using a jwt token
    def post(self):
        try: 
            current_user = get_jwt_identity()
            return {
                'Message': 'JWT successfully verified',
                'jwt_identity': current_user
            }, 200
        except Exception as e:
            return {
                'Error Message': 'JWT failed to be verified',
                'Reason': e    
            }, 401

class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {
            'Message': 'Token Refreshed',
            'jwt_identity': current_user,
            'access_token': access_token}, 200


        