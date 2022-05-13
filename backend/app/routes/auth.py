import jwt

from fastapi import APIRouter

router = APIRouter(
    prefix='/auth'
)


@router.post('/registration')
async def user_registration():
    pass


@router.post('/get_token')
async def get_token():

