#!/usr/bin/env python

from sqlalchemy import Column, Integer, ForeignKey, String, types, create_engine
from sqlalchemy.ext.declarative import declarative_base

#Choice of database, if you wan't to develope flask api seperate from all other components use sqlite 
#DB_URI = 'sqlite:///./main.db'
#DB_URI = 'postgresql://admin:secret@localhost:5432/menviewdb'
DB_URI = 'postgresql://admin:secret@menview_db_1:5432/menviewdb'

Base = declarative_base()

class Review(Base):
    __tablename__='reviews'
    
    review_id = Column(Integer, primary_key=True)
    rating = Column(Integer)
    username = Column(String(20), ForeignKey("users.username"), nullable=False)
    dish_id = Column(Integer, ForeignKey("dishes.dish_id"), nullable=False)
    review = Column(String(200))
                
class Restaurant(Base):
    __tablename__ = 'restaurants'

    name = Column(String(30), primary_key=True)
    lat = Column(String(30)) # parse into float in CLIENT-SIDE
    lon = Column(String(30)) # parse into float in CLIENT-SIDE
    address = Column(String(250))
    description = Column(String(200))
    rating = Column(Integer)

class User(Base):
    __tablename__= 'users'
    
    username = Column(String(20), primary_key=True)
    email = Column(String(50), primary_key=True)
    password = Column(String(256), nullable=False)
#    file = Column(String(60))

class Dish(Base):
    __tablename__='dishes'
    
    dish_id = Column(Integer, primary_key=True)
    dish_rating = Column(Integer)
    dish_name = Column(String(60), nullable=False)
    dish_description = Column(String(200))
    restaurant_name = Column(String(30), ForeignKey("restaurants.name"), nullable=False)
    

if __name__ == "__main__":

    engine = create_engine(DB_URI)
    Base.metadata.create_all(engine)
    
