from transformers import pipeline

from app.services.retrieval_service import (
    retrieve_claim_context
)

# -----------------------------
# LOAD MODEL
# -----------------------------
generator = pipeline(
    "text-generation",
    model="google/flan-t5-base"
)

# -----------------------------
# MAIN FUNCTION
# -----------------------------
def generate_claim_response(
    query: str,
    claim_id: str
):

    context = retrieve_claim_context(
        query=query,
        claim_id=claim_id
    )

    if not context:

        return {
            "response": "No relevant claim documents found."
        }

    final_prompt = f"""
You are a strict document question-answering AI.

RULES:
- Answer ONLY using the provided document context.
- Do NOT act like a chatbot.
- Do NOT ask follow-up questions.
- Do NOT invent claim details.
- Do NOT add greetings.
- Do NOT add explanations outside context.
- Keep answers SHORT and FACTUAL.
- If answer is missing, say:
  "Information not found in uploaded documents."

DOCUMENT CONTEXT:
{context}

QUESTION:
{query}

FINAL ANSWER:
"""

    result = generator(
        final_prompt,
        max_new_tokens=80,
        do_sample=False
    )

    generated_text = result[0]["generated_text"]

    final_answer = generated_text.replace(
        final_prompt,
        ""
    ).strip()

    return {
        "response": final_answer
    }