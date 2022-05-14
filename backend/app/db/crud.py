import fastapi
from sqlalchemy.orm import Session
from . import models
from .models import User as UserModelSql
from backend.app.schemas.request_models import *
from backend.app.schemas.user_schemas import *
from backend.app.db.db_session import get_session

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
import hashlib
import jwt

oauth2scheme = OAuth2PasswordBearer(tokenUrl="/auth/get_token")
JWT_SECRET = 'TOP SECRET'


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: UserCreate):
    hashed_password = hashlib.sha512(user.password.encode('utf-8')).hexdigest()
    created_user_instance = models.User(username=user.username, password=hashed_password)
    db.add(created_user_instance)
    db.commit()
    db.refresh(created_user_instance)
    return created_user_instance


def create_shorten_request(db: Session, summarized_data, text, user: User, shorten_type: str,
                           shorten_request: ResponseModel | None = None):
    user = get_user_by_username(db, user.username)
    if shorten_request:
        db_item = models.ShortenRequest(text=shorten_request.text,
                                        shorten_type=shorten_request.shorten_type,
                                        result=shorten_request.result,
                                        user_id=shorten_request.user_id),
    else:
        db_item = models.ShortenRequest(text=text,
                                        shorten_type=shorten_type,
                                        result=summarized_data,
                                        user=user)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)


def auth_user(db: Session, username: str, password: str):
    user: models.User = get_user_by_username(db, username)
    if not user: return False
    if not user.verify_password(hashlib.sha512(password.encode('utf-8')).hexdigest()):
        return False
    return user


def create_token(user: models.User):
    user_instance = User.from_orm(user)
    token = jwt.encode(user_instance.dict(), JWT_SECRET)

    return dict(access_token=token, token_type='bearer')


def get_current_user(db: Session = Depends(get_session), token: str = Depends(oauth2scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except:
        raise fastapi.HTTPException(status_code=401, detail="Invalid email or password")

    return User.from_orm(user)
