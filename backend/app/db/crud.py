from sqlalchemy.orm import Session
from . import models
from backend.app.schemas.request_models import *
from backend.app.schemas.user_schemas import *


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: UserCreate):
    created_user_instance = models.User(username=user.username, password=user.password)
    db.add(created_user_instance)
    db.commit()
    db.refresh(created_user_instance)
    return created_user_instance


def create_shorten_request(db: Session, shorten_request: ResponseModel, user: User):
    user = get_user_by_username(db, user.username)
    db_item = models.ShortenRequest(text=shorten_request.text,
                                    shorten_type=shorten_request.shorten_type,
                                    result=shorten_request.result,
                                    user_id=shorten_request.user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
   