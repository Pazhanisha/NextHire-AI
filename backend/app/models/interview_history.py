from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class InterviewHistory(Base):

    __tablename__ = "interview_history"

    id = Column(Integer, primary_key=True, index=True)

    role = Column(String)

    score = Column(Integer)

    feedback = Column(Text)

    created_at = Column(String)