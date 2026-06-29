from sqlalchemy import Column,Integer,String,Text
from app.database import Base


class Interview(Base):

    __tablename__="interviews"


    id = Column(Integer,primary_key=True)

    type = Column(String)

    question = Column(Text)

    answer = Column(Text)

    score = Column(Integer)

    feedback = Column(Text)