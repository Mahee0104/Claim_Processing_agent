from fastapi import APIRouter, Query
from app.vector.vector_store import vector_store

router = APIRouter(
    prefix="/vector",
    tags=["Vector Search"]
)


@router.get("/search")
def search_vectors(
    query: str = Query(...),
    claim_id: str = Query(None),
    top_k: int = 5
):

    results = vector_store.search(
        query=query,
        claim_id=claim_id,
        top_k=top_k
    )

    return {
        "query": query,
        "claim_id": claim_id,
        "total_results": len(results),
        "results": results
    }