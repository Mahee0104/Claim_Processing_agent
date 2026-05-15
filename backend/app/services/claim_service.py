from sqlalchemy.orm import Session

from app.models.claim_model import Claim


def create_claim(
    db: Session,
    claim
):

    new_claim = Claim(

        insurance_type=claim.insurance_type,

        description=claim.description,

        status="Pending"
    )

    db.add(new_claim)

    db.commit()

    db.refresh(new_claim)

    return new_claim


def get_all_claims(
    db: Session
):

    return db.query(Claim).all()


def get_claim_by_id(
    db: Session,
    claim_id: int
):

    return db.query(Claim).filter(
        Claim.id == claim_id
    ).first()