from app.vector.vector_store import vector_store


def retrieve_claim_context(
    query: str,
    claim_id: str,
    top_k: int = 3
):

    results = vector_store.search(
        query=query,
        claim_id=claim_id,
        top_k=top_k
    )

    if not results:
        return ""

    context_parts = []

    for item in results:

        text = item.get("text")

        if text:
            context_parts.append(text)

    return "\n\n".join(context_parts)