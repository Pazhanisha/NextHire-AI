from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base

from app.routers.auth import router as auth_router
from app.routers.resume import router as resume_router
from app.routers.mentor import router as mentor_router
from app.routers.interview import router as interview_router
from app.routers.analysis import router as analysis_router
from app.models.interview_history import InterviewHistory
from app.routers.settings import router as settings_router
from app.models.user import User
from app.models.analysis import Analysis
from app.models.settings import Settings
from app.models.profile import Profile
from app.routers.profile import router as profile_router
from app.routers.analytics import router as analytics_router
from app.models.skill import Skill
from app.routers.skills import router as skills_router
from app.models.job import Job
from app.routers.jobs import router as jobs_router
from app.models.notification import NotificationSetting
import app.scheduler.email_scheduler
from app.models.recommendation import Recommendation
from app.routers.recommendation import router as recommendation_router

# create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI()



# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



# Routers

app.include_router(auth_router)

app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(analysis_router)
app.include_router(mentor_router)
app.include_router(settings_router)
app.include_router(profile_router)
app.include_router(analytics_router)
app.include_router(skills_router)
app.include_router(jobs_router)
app.include_router(recommendation_router)








@app.get("/")
def home():

    return {
        "message":"Backend is working"
    }