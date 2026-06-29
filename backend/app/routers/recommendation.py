from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.recommendation import Recommendation
from app.models.analysis import Analysis
from app.models.interview import Interview
from app.models.user import User
from app.models.skill import Skill
from app.services.recommendation_ai import generate_recommendation

from datetime import datetime





router = APIRouter(
    prefix="/recommendation",
    tags=["AI Recommendation"]
)





@router.post("/generate")
def create_recommendation(
    db: Session = Depends(get_db)
):


    # temporary first user

    user = db.query(User).first()



    if not user:

        return {
            "message": "User not found"
        }






    # latest resume analysis

    resume = (

        db.query(Analysis)

        .filter(
            Analysis.user_id == user.id
        )

        .order_by(
            Analysis.id.desc()
        )

        .first()

    )






    # latest interview

    interview = (

        db.query(Interview)

        .order_by(
            Interview.id.desc()
        )

        .first()

    )







    # resume data

    resume_data = {}


    if resume:

        resume_data = resume.analysis







    # interview score

    interview_score = 0


    if interview:

        interview_score = interview.score






    # skills

    # get user skills

    skill_records = (

        db.query(Skill)

        .filter(

            Skill.user_id == user.id

        )

        .all()

    )


    skills = [

        skill.name

        for skill in skill_records

    ]







    # AI generation

    result = generate_recommendation(

        resume_data,

        interview_score,

        skills

    )







    recommendation = Recommendation(

        user_id=user.id,

        recommended_role=result["recommended_role"],

        skill_gap=result["skill_gap"],

        roadmap=result["roadmap"],

        created_at=datetime.utcnow()

    )





    db.add(recommendation)

    db.commit()

    db.refresh(recommendation)







    return {

        "message":

        "Career recommendation generated",


        "data": result

    }