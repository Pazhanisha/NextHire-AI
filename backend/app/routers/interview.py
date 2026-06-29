from fastapi import APIRouter
from pydantic import BaseModel
from app.models.interview_history import InterviewHistory
from app.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends

from app.services.ai_service import (
    generate_interview_questions,
    analyze_answer
)


router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


class InterviewRequest(BaseModel):
    role: str


class AnswerRequest(BaseModel):
    answer: str
    role: str



# Generate AI Interview Questions
@router.post("/start")
def start_interview(data: InterviewRequest):

    questions = generate_interview_questions(data.role)

    return {
        "questions": questions
    }



# Analyze Interview Answer
@router.post("/analyze")
def interview_feedback(data: AnswerRequest):

    feedback = analyze_answer(
        data.answer,
        data.role
    )

    return feedback
@router.post("/save-history")
def save_history(
    data: AnswerRequest,
    db: Session = Depends(get_db)
):

    history = InterviewHistory(

        role=data.role,

        score=80,

        feedback="Interview completed successfully"

    )


    db.add(history)

    db.commit()


    return {
        "message":"Interview saved"
    }
@router.get("/history")
def get_history(db: Session = Depends(get_db)):

    data = db.query(InterviewHistory).all()

    return data