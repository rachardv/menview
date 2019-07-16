from flask import request
from models import Review
from db import session
from datetime import datetime
from flask_restful import reqparse, abort, Resource, fields, marshal_with


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
        reviews = session.query(Review).all()
        return reviews

    @marshal_with(review_fields)
    def post(self):
        parsed_args = parser.parse_args()
        review = Review(review_id=parsed_args['review_id'], username=parsed_args['username'],
                    rating=parsed_args['rating'], review=parsed_args['review'],
                    dish_id=parsed_args['dish_id'])
        session.add(review)
        session.commit()
        return review, 201


