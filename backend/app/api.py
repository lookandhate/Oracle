import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.shakespeare import shakespeare_router
from .routes.auth import auth_router
from .db.db_session import *

app = FastAPI()
global_init()
session = get_session()

origins = ["http://localhost:3000", "localhost:3000"]

app.include_router(shakespeare_router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/", tags=["root"])
# @app.post('/')
# async def read_root() -> dict:
#     return {"message": "hello world"}


@app.get("/test_react")
async def test_react():
    return {"status": "succ"}
