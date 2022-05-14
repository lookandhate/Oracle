from pydantic import BaseModel


class ParaphraseRequestModel(BaseModel):
    text: str
    sentences_to_return: int


class T5SummaryRequestModel(BaseModel):
    text: str
    min_length: int
    max_length: int


class ResponseModelBase(BaseModel):
    text: str
    shorten_text: str
    shorten_type: str
    result: str


class ResponseModel(ResponseModelBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
