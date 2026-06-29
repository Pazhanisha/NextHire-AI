from sqlalchemy import Column, Integer, Text, ForeignKey
from app.database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    analysis = Column(Text)
    