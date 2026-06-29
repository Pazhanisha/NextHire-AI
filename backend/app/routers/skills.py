from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.skill import Skill


router = APIRouter(

    prefix="/skills",
    tags=["Skills"]

)



@router.get("/")
def get_skills(

db:Session=Depends(get_db)

):


    skills=db.query(Skill).filter(

        Skill.user_id==1

    ).all()


    return skills





@router.post("/add")
def add_skill(

data:dict,

db:Session=Depends(get_db)

):


    skill=Skill(

        user_id=1,

        name=data["name"],

        level=data.get(
            "level",
            "Beginner"
        ),

        progress=data.get(
            "progress",
            0
        )

    )


    db.add(skill)

    db.commit()

    db.refresh(skill)


    return {

        "message":"Skill added",

        "skill":skill

    }





@router.delete("/{skill_id}")
def delete_skill(

skill_id:int,

db:Session=Depends(get_db)

):


    skill=db.query(Skill).filter(

        Skill.id==skill_id

    ).first()



    if skill:

        db.delete(skill)

        db.commit()



    return {

        "message":"Deleted"

    }