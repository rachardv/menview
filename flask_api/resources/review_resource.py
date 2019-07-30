from flask import request, jsonify
from models import Review
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with
from flask_jwt_extended import jwt_required, get_jwt_identity


review_fields = {
    'username': fields.String,
    'rating': fields.Integer,
    'review': fields.String,
    'dish_id': fields.Integer,
    'review_id': fields.Integer
}



parser = reqparse.RequestParser()

#parse args for review                                                                                                                                
parser.add_argument('username')
parser.add_argument('rating')
parser.add_argument('review')
parser.add_argument('dish_id')
parser.add_argument('review_id')


class ReviewResource(Resource):
    #Get a single review, use review_id to filter
    @marshal_with(review_fields)
    def get(self, review_id):
        review = session.query(Review).filter(Review.review_id == review_id).first()
        if not review:
            abort(404, message="review {} doesn't exist".format(review_id))
        return review
    #Delete a single review, use review_id to filter
    def delete(self, review_id):
        review = session.query(Review).filter(Review.review_id == review_id).first()
        if not review:
            abort(404, message="review {} doesn't exist".format(review_id))
        session.delete(review)
        session.commit()
        return {}, 204
    #alter a record
    @marshal_with(review_fields)
    def put(self, review_id):
        parsed_args = parser.parse_args()
        review = session.query(Review).filter(Review.review_id == review_id).first()
        review.review_id = parsed_args['review_id']
        review.username = parsed_args['username']
        review.rating = parsed_args['rating']
        review.review = parsed_args['review']
        review.dish_id = parsed_args['dish_id']
        session.add(review)
        session.commit()
        return review, 201


class ReviewListResource(Resource):
    @marshal_with(review_fields)
    def get(self):
        try:
            parsed_args = parser.parse_args()
            username = parsed_args['username']
            dish_id = parsed_args['dish_id']

            if None not in (username, dish_id): 
                reviews = session.query(Review).filter(Review.username == username, Review.dish_id==dish_id).all()
            elif username:
                reviews = session.query(Review).filter(Review.username == username).all()
            elif dish_id:
                reviews = session.query(Review).filter(Review.dish_id == dish_id).all()
            else:
                raise Exception("Improper Parameters for GET request")

            return reviews, 200

        except Exception as e:
            abort(400, message="{}".format(e))


    @jwt_required
    def post(self):
        try:
            current_user = get_jwt_identity()
            
            parsed_args = parser.parse_args()
            review = Review(review_id=None, username=current_user,
                        rating=int(parsed_args['rating']), review=parsed_args['review'],
                        dish_id=int(parsed_args['dish_id']))
            
            
            session.add(review)
            session.commit()
            
            return {
                "Message": "Review successfully made"
            }, 201
        except Exception as e:
            abort(500, message="{}".format(e))



