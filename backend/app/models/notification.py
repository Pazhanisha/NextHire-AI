from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class NotificationSetting(Base):

    __tablename__ = "notification_settings"


    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    email = Column(String)


    dailyTips = Column(Boolean, default=True)

    weeklyReview = Column(Boolean, default=True)

    jobAlerts = Column(Boolean, default=True)

    interviewReminder = Column(Boolean, default=True)

    skillReminder = Column(Boolean, default=True)

    marketing = Column(Boolean, default=False)


    difficulty = Column(String, default="Intermediate")

    careerDomain = Column(String, default="AI / ML")

    theme = Column(String, default="Dark")


    saveHistory = Column(Boolean, default=True)

    aiLearning = Column(Boolean, default=True)