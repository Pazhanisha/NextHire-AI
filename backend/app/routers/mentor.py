from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json
from pydantic import BaseModel

from app.database import get_db

from app.models.analysis import Analysis
from app.models.interview_history import InterviewHistory

from app.services.ai_service import career_advice


router = APIRouter(
    prefix="/mentor",
    tags=["Career Mentor"]
)



@router.get("/advice")
def mentor(
    db: Session = Depends(get_db)
):


    # latest resume analysis

    latest_resume = (
        db.query(Analysis)
        .order_by(Analysis.id.desc())
        .first()
    )


    if not latest_resume:

        return {
            "message":
            "Upload resume first"
        }




    resume_data = json.loads(
        latest_resume.analysis
    )



    resume_text = f"""

Resume Score:
{resume_data.get("score")}


Feedback:
{resume_data.get("feedback")}


Strength:
{resume_data.get("strength")}


Improvement:
{resume_data.get("improvement")}

"""



    # latest interview score


    latest_interview = (

        db.query(InterviewHistory)

        .order_by(
            InterviewHistory.id.desc()
        )

        .first()

    )



    if latest_interview:


        interview_score = latest_interview.score


    else:


        interview_score = 0




    result = career_advice(

        resume_text,

        interview_score

    )



    return result
class ChatRequest(BaseModel):

    message:str



@router.post("/chat")
def mentor_chat(data:ChatRequest):


    from app.services.ai_service import mentor_chat


    response = mentor_chat(
        data.message
    )


    return {

        "reply":response

    }