from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database import get_db
from app.models.notification import NotificationSetting


router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


class SettingsRequest(BaseModel):

    dailyTips: bool
    weeklyReview: bool
    jobAlerts: bool
    interviewReminder: bool
    skillReminder: bool

    marketing: bool

    difficulty: str
    careerDomain: str
    theme: str

    saveHistory: bool
    aiLearning: bool


@router.post("/save")
def save_settings(
    data: SettingsRequest,
    db: Session = Depends(get_db)
):

    settings = db.query(NotificationSetting).filter(
        NotificationSetting.user_id == 1
    ).first()

    if not settings:

        settings = NotificationSetting(
            user_id=1,
            email="mspazhanisha@gmail.com"
        )

        db.add(settings)

    settings.dailyTips = data.dailyTips
    settings.weeklyReview = data.weeklyReview
    settings.jobAlerts = data.jobAlerts
    settings.interviewReminder = data.interviewReminder
    settings.skillReminder = data.skillReminder

    db.commit()

    return {
        "message": "Settings saved successfully"
    }


@router.get("/")
def get_settings(
    db: Session = Depends(get_db)
):

    settings = db.query(NotificationSetting).filter(
        NotificationSetting.user_id == 1
    ).first()

    if not settings:

        return {
            "dailyTips": True,
            "weeklyReview": True,
            "jobAlerts": True,
            "interviewReminder": True,
            "skillReminder": True
        }

    return settings