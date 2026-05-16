from fastapi import APIRouter, Query
from app.vector.vector_store import vector_store

router = APIRouter(prefix="/vector", tags=["Vector Search"])


@router.get("/search")
def search(query: str = Query(...), top_k: int = 5):

    results = vector_store.search(query, top_k)

    return {
        "query": query,
        "results": results
    }