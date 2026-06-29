from sqlalchemy import Column, Integer, String, ForeignKey, Text
from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    full_name = Column(String)
    email = Column(String)

    phone = Column(String)

    college = Column(String)
    degree = Column(String)
    cgpa = Column(String)

    github = Column(String)
    linkedin = Column(String)
    portfolio = Column(String)

    bio = Column(Text)

    skills = Column(Text)

    profile_image = Column(String)