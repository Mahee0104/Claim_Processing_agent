from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from app.utils.jwt_handler import verify_token


security = HTTPBearer()


def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security)

):

    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    return payload