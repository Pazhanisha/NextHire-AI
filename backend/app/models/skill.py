from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Skill(Base):

    __tablename__ = "skills"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    name = Column(String)


    level = Column(
        String,
        default="Beginner"
    )


    progress = Column(
        Integer,
        default=0
    )