from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Job(Base):

    __tablename__ = "jobs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )


    company = Column(String)


    role = Column(String)


    location = Column(String)


    status = Column(
        String,
        default="Saved"
    )