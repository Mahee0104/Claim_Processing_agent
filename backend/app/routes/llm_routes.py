from fastapi import APIRouter, Query

from app.services.llm_service import (
    generate_claim_response
)

router = APIRouter(
    prefix="/llm",
    tags=["LLM"]
)


@router.get("/ask")
def ask_llm(
    query: str = Query(...),
    claim_id: str = Query(...)
):

    result = generate_claim_response(
        query=query,
        claim_id=claim_id
    )

    return result