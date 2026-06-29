from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Recommendation(Base):

    __tablename__ = "recommendations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer
    )


    recommended_role = Column(
        String
    )


    skill_gap = Column(
        Text
    )


    roadmap = Column(
        Text
    )


    created_at = Column(
        String
    )