import sqlalchemy

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .db_session import SqlAlchemyBase


class User(SqlAlchemyBase):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)

    requests = relationship('ShortenRequest', back_populates='user')


class ShortenRequest(SqlAlchemyBase):
    __tablename__ = 'shorten_requests'

    id = Column(Integer, primary_key=True)
    text = Column(String)
    shorten_type = Column(String)
    result = Column(String)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship(User, back_populates='requests')
