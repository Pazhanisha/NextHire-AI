from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.notification import NotificationSetting
from app.services.ai_service import mentor_chat
from app.services.email_service import send_otp_email
from app.services.email_service import send_career_email



def send_daily_career_tip():

    print("🔥 Daily career scheduler started")


    db: Session = SessionLocal()


    users = db.query(NotificationSetting).all()


    print("USERS FOUND:", len(users))


    for user in users:

        print("Sending to:", user.email)


        tip = mentor_chat(
            "Give one short daily AI career improvement tip"
        )


        send_career_email(
            user.email,
            tip
        )


    db.close()




scheduler = BackgroundScheduler()


scheduler.add_job(
    send_daily_career_tip,
    "cron",
    hour=9
)


scheduler.start()