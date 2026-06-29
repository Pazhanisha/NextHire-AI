from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.models.profile import Profile


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/")
def get_profile(
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).filter(
        Profile.user_id == 1
    ).first()


    if not profile:
        return {
            "message": "No profile found"
        }


    return {
        "full_name": profile.full_name,
        "email": profile.email,
        "phone": profile.phone,
        "college": profile.college,
        "degree": profile.degree,
        "cgpa": profile.cgpa,
        "github": profile.github,
        "linkedin": profile.linkedin,
        "portfolio": profile.portfolio,
        "bio": profile.bio,
        "skills": json.loads(profile.skills)
        if profile.skills else []
    }



@router.post("/save")
def save_profile(
    data: dict,
    db: Session = Depends(get_db)
):

    profile = db.query(Profile).filter(
        Profile.user_id == 1
    ).first()



    if profile:

        for key,value in data.items():

            if key == "skills":

                value = json.dumps(value)


            setattr(
                profile,
                key,
                value
            )


    else:

        profile = Profile(

            user_id=1,

            full_name=data.get("full_name"),

            email=data.get("email"),

            phone=data.get("phone"),

            college=data.get("college"),

            degree=data.get("degree"),

            cgpa=data.get("cgpa"),

            github=data.get("github"),

            linkedin=data.get("linkedin"),

            portfolio=data.get("portfolio"),

            bio=data.get("bio"),

            skills=json.dumps(
                data.get("skills",[])
            )

        )


        db.add(profile)


    db.commit()


    return {
        "message":"Profile saved successfully"
    }