import fastapi
import jwt

from fastapi import APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from backend.app.schemas.user_schemas import UserCreate
from backend.app.db.db_session import get_session
from backend.app.db.crud import *
from sqlalchemy.orm import Session

auth_router = APIRouter(
    prefix='/auth'
)


@auth_router.post('/registration')
async def user_registration(
        user: UserCreate,
        db: Session = Depends(get_session)
):
    user = create_user(db, user)
    token = create_token(user)
    return token


@auth_router.post('/get_token')
async def get_token(form_data: OAuth2PasswordRequestForm = Depends(),
                    db: Session = Depends(get_session)):
    user = auth_user(db, form_data.username, form_data.password)
    if not user:
        raise fastapi.HTTPException(status_code=401, detail='Invalid creds')
    return create_token(user)


@auth_router.get('/me', response_model=User)
async def get_user(user: User = Depends(get_current_user)):
    return user
