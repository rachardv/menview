#!/usr/bin/env python

from sqlalchemy import Column, Integer, ForeignKey, String, create_engine
from sqlalchemy.ext.declarative import declarative_base



# Choice of database, if you wan't to develope flask api seperate from all other components use sqlite 
# DB_URI = 'sqlite:///./main.db'
DB_URI = 'postgresql://admin:secret@menview_db_1:5432/menviewdb'

Base = declarative_base()

class Restaurant(Base):
    __tablename__ = 'restaurants'

    name = Column(String(30), primary_key=True)
    lat = Column(Integer)
    lon = Column(Integer)
    address = Column(String(100))
    description = Column(String(200))
    rating = Column(Integer)

class User(Base):
    __tablename__= 'users'
    
    username = Column(String(20), primary_key=True)
    email = Column(String(50), unique=True, nullable=False)
    password = Column(String(30), nullable=False)

class Dish(Base):
    __tablename__='dishes'
    
    dish_id = Column(Integer, primary_key=True)
    name = Column(String(60), nullable=False)
    description = Column(String(200))
    restaurant_name = Column(String(30), ForeignKey("restaurants.name"), nullable=False)
    

if __name__ == "__main__":

    engine = create_engine(DB_URI)
    Base.metadata.create_all(engine)

