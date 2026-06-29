from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from app.database import Base


class Settings(Base):

    __tablename__ = "settings"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )


    dailyTips = Column(Boolean, default=True)

    weeklyReview = Column(Boolean, default=True)

    jobAlerts = Column(Boolean, default=True)

    interviewReminder = Column(Boolean, default=True)

    skillReminder = Column(Boolean, default=True)

    marketing = Column(Boolean, default=False)


    difficulty = Column(String)

    careerDomain = Column(String)

    theme = Column(String)


    saveHistory = Column(Boolean, default=True)

    aiLearning = Column(Boolean, default=True)