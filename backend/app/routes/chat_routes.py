from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.chat_schema import (
    ChatRequest
)

from app.config.dependencies import (
    get_db
)

from app.services.claim_service import (
    get_claim_by_id
)

from app.services.groq_service import (
    generate_ai_response
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")
def chat(

    data: ChatRequest,

    db: Session = Depends(get_db)

):

    claim = get_claim_by_id(
        db,
        data.claim_id
    )

    if not claim:

        raise HTTPException(
            status_code=404,
            detail="Claim not found"
        )

    claim_context = f"""

    Claim ID:
    {claim.id}

    Insurance Type:
    {claim.insurance_type}

    Description:
    {claim.description}

    Status:
    {claim.status}

    """

    ai_response = generate_ai_response(

        data.message,

        claim_context
    )

    return {
        "response": ai_response
    }