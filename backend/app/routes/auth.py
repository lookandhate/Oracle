import jwt

from fastapi import APIRouter

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
    print(user)


@auth_router.post('/get_token')
async def get_token():
    pass
