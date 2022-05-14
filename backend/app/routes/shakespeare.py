import fastapi
from summarizer import summarize

from ..schemas.request_models import ParaphraseRequestModel, T5SummaryRequestModel, ResponseModel
from ..schemas.user_schemas import User
from ..db.models import User, ShortenRequest
from backend.app.db.db_session import get_session
from ..networks.Summary import Summary
from ..networks.T5Summary import T5Summary, Summarizer
from backend.app.db.crud import get_current_user, create_shorten_request
from sqlalchemy.orm import Session
from fastapi import Depends

from fastapi import APIRouter

shakespeare_router = APIRouter(
    prefix="/api"
)

models = {}


@shakespeare_router.on_event("startup")
async def router_startup():
    models['t5'] = T5Summary()


@shakespeare_router.post('/paraphrase', tags=['ml_models_endpoint'])
async def paraphrase(request_data: ParaphraseRequestModel, user: User | None = Depends(get_current_user),
                     db: Session = Depends(get_session)):
    summary: Summary = Summary()
    summarized_data = summary.generate_summary(request_data.text, int(len(request_data.text.split('.')) / 2))
    print(user)
    if user:
        create_shorten_request(db, summarized_data, request_data.text, user, 'math')

    return {"text": request_data.text,
            "summarized": summarized_data,
            "type": "math"}


@shakespeare_router.post('/t5_paraphrase', tags=['ml_models_endpoint'])
async def t5_summary(request_data: T5SummaryRequestModel):
    model: T5Summary = models['t5']
    text = model.summarize(request_data.text, request_data.min_length, request_data.max_length)[0]['summary_text']
    return {'text': request_data.text,
            'summarized': text,
            "type": "t5"}


@shakespeare_router.post('/paraphrase_unauth', tags=['ml_models_endpoint'])
async def paraphrase_unauth(request_data: ParaphraseRequestModel):
    summary: Summary = Summary()
    summarized_data = summary.generate_summary(request_data.text, int(len(request_data.text.split('.')) / 2))

    return {"text": request_data.text,
            "summarized": summarized_data,
            "type": "math"}


@shakespeare_router.post('/t5_paraphrase_unauth', tags=['ml_models_endpoint'])
async def t5_summary_unauth(request_data: T5SummaryRequestModel):
    model: T5Summary = models['t5']
    text = model.summarize(request_data.text, request_data.min_length, request_data.max_length)[0]['summary_text']
    return {'text': request_data.text,
            'summarized': text,
            "type": "t5"}


@shakespeare_router.post('/bert_summary', tags=['ml_models_endpoint'])
async def bert_summary(request_data: T5SummaryRequestModel):
    model: Summarizer = Summarizer()
    text = summarize(title='test', count=250, text=request_data.text)
    return {'text': request_data.text,
            'summarized': text,
            "type": "bert"}
