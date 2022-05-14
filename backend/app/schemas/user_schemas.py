from pydantic import BaseModel
from .request_models import ResponseModelBase


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    requests = list[ResponseModelBase]

    class Config:
        orm_mode = True
