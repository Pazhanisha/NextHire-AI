from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import random

from app.database import get_db
from app.models.user import User
from app.services.email_service import send_otp_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



temp_users = {}
otp_storage = {}



class RegisterRequest(BaseModel):

    name:str
    email:str
    password:str



class VerifyRequest(BaseModel):

    email:str
    otp:str



class LoginRequest(BaseModel):

    email:str
    password:str





@router.post("/register")
def register(
    data:RegisterRequest
):


    otp = str(
        random.randint(100000,999999)
    )


    temp_users[data.email] = {

        "name":data.name,

        "email":data.email,

        "password":data.password

    }


    otp_storage[data.email] = otp



    send_otp_email(
        data.email,
        otp
    )


    return {

        "message":"OTP sent",

        "email":data.email

    }






@router.post("/verify")
def verify(
    data:VerifyRequest,
    db:Session = Depends(get_db)
):


    saved_otp = otp_storage.get(
        data.email
    )


    if saved_otp != data.otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )



    user_data = temp_users[data.email]



    new_user = User(

        name=user_data["name"],

        email=user_data["email"],

        password=user_data["password"]

    )


    db.add(new_user)

    db.commit()

    db.refresh(new_user)



    return {

        "message":"Account created",

        "user":{

            "id":new_user.id,

            "name":new_user.name,

            "email":new_user.email

        }

    }





@router.post("/login")
def login(
    data:LoginRequest,
    db:Session = Depends(get_db)
):


    user = db.query(User).filter(
        User.email == data.email
    ).first()



    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )



    if user.password != data.password:

        raise HTTPException(
            status_code=400,
            detail="Wrong password"
        )



    return {

        "message":"Login successful",

        "user":{

            "id":user.id,

            "name":user.name,

            "email":user.email

        }

    }