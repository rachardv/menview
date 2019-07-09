#!/usr/bin/env python

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

#This is where we need a db address
DB_URI = 'sqlite:///./main.db'
Base = declarative_base()

class Restaurant(Base):
    __tablename__ = 'restaurants'

    name = Column(String(30), primary_key=True)
    lat = Column(Integer)
    lon = Column(Integer)
    address = Column(String(100))
    description = Column(String(200))
    rating = Column(Integer)


if __name__ == "__main__":


    engine = create_engine(DB_URI)
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

