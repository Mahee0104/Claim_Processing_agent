from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.claim_schema import (
    ClaimCreate
)

from app.services.claim_service import (
    create_claim,
    get_all_claims
)

from app.config.dependencies import (
    get_db
)

from app.utils.jwt_bearer import (
    get_current_user
)

router = APIRouter(
    prefix="/claims",
    tags=["Claims"]
)


@router.post("/create")
def add_claim(

    claim: ClaimCreate,

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    new_claim = create_claim(db, claim)

    return {
        "message": "Claim created successfully",
        "claim": {
            "id": new_claim.id,
            "insurance_type": new_claim.insurance_type,
            "description": new_claim.description,
            "status": new_claim.status
        }
    }


@router.get("/")
def fetch_claims(

    db: Session = Depends(get_db),

    current_user = Depends(get_current_user)

):

    claims = get_all_claims(db)

    return claims