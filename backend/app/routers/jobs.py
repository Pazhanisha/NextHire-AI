from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.job import Job


router = APIRouter(

prefix="/jobs",
tags=["Jobs"]

)




@router.get("/")
def get_jobs(
db:Session=Depends(get_db)
):


    return db.query(Job).filter(

        Job.user_id==1

    ).all()





@router.post("/add")
def add_job(
data:dict,
db:Session=Depends(get_db)
):


    job=Job(

        user_id=1,

        company=data["company"],

        role=data["role"],

        location=data["location"],

        status=data.get(
            "status",
            "Saved"
        )

    )


    db.add(job)

    db.commit()

    db.refresh(job)


    return job






@router.delete("/{job_id}")
def delete_job(

job_id:int,

db:Session=Depends(get_db)

):


    job=db.query(Job).filter(

        Job.id==job_id

    ).first()



    if job:

        db.delete(job)

        db.commit()



    return {

        "message":"Job deleted"

    }