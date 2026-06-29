from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "ai-interview-secret"
ALGORITHM = "HS256"


def create_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(hours=1)

    to_encode.update({
        "exp": expire
    })

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token