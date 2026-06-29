from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.models.analysis import Analysis


router = APIRouter()
@router.get("/resume-history")
def resume_history(
    db: Session = Depends(get_db)
):

    records = db.query(Analysis).filter(
        Analysis.user_id == 1
    ).order_by(
        Analysis.id.desc()
    ).all()


    return [

        {
            "id": item.id,
            "analysis": json.loads(item.analysis)
        }

        for item in records

    ]