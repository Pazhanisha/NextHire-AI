from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import json

from app.database import get_db
from app.models.analysis import Analysis
from app.services.pdf_service import extract_text
from app.services.ai_service import analyze_resume


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)



@router.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:

        print("FILE:", file.filename)


        file_path = f"uploads/{file.filename}"


        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)


        print("FILE SAVED")


        resume_text = extract_text(file_path)


        print("TEXT EXTRACTED")


        analysis = analyze_resume(resume_text[:3000])


        print("AI DONE")


        new_analysis = Analysis(
            user_id=1,
            analysis=json.dumps(analysis)
        )


        db.add(new_analysis)

        db.commit()


        return {
            "message":"Resume analyzed successfully",
            "analysis":analysis
        }


    except Exception as e:

        print("ERROR:",e)

        return {
            "error":str(e)
        }