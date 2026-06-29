from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.analysis import Analysis
from app.models.interview_history import InterviewHistory
from app.models.skill import Skill
from app.models.job import Job


router = APIRouter(

prefix="/analytics",
tags=["Analytics"]

)





@router.get("/")
def analytics(

db:Session=Depends(get_db)

):


    resume_count = db.query(
        Analysis
    ).filter(
        Analysis.user_id==1
    ).count()



    interview_count = db.query(
        InterviewHistory
    ).count()



    skills_count = db.query(
        Skill
    ).count()



    jobs_count = db.query(
        Job
    ).filter(
        Job.user_id==1
    ).count()





    scores = db.query(
        InterviewHistory.score
    ).all()



    avg_score = 0


    if scores:

        avg_score = sum(
            x[0] for x in scores
        ) / len(scores)





    career_score = int(
        (
        avg_score +
        (skills_count*5)
        ) / 2
    )



    return {


        "resumeAnalyzed":
        resume_count,


        "interviews":
        interview_count,


        "skills":
        skills_count,


        "savedJobs":
        jobs_count,


        "averageInterviewScore":
        round(avg_score),


        "careerScore":
        career_score


    }