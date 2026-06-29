import os
import smtplib


def send_otp_email(receiver, otp):

    sender = os.getenv("EMAIL")
    password = os.getenv("EMAIL_PASSWORD")

    subject = "NextHire AI OTP Verification"

    body = f"""
Your NextHire AI verification code is:

{otp}

This OTP is valid for 10 minutes.

If you didn't request this code, you can safely ignore this email.
"""

    message = f"Subject: {subject}\n\n{body}"


    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        sender,
        password
    )


    server.sendmail(
        sender,
        receiver,
        message
    )

    server.quit()



# NEW FUNCTION FOR AI CAREER EMAIL

def send_career_email(receiver, tip):

    sender = os.getenv("EMAIL")
    password = os.getenv("EMAIL_PASSWORD")


    subject = "NextHire AI Daily Career Tip"


    body = f"""
Hello 👋

Your daily AI career improvement tip:

{tip}

Keep learning and growing with NextHire AI.
"""


    message = f"""Subject: {subject}
From: {sender}
To: {receiver}

{body}
"""


    message = message.encode("utf-8")


    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()


    server.login(
        sender,
        password
    )


    server.sendmail(
        sender,
        receiver,
        message
    )


    print("✅ Career email sent")


    server.quit()