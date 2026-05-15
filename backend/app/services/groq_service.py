from groq import Groq

from app.config.settings import (
    GROQ_API_KEY
)

client = Groq(
    api_key=GROQ_API_KEY
)


def generate_ai_response(

    user_message,

    claim_data

):

    prompt = f"""

    You are an AI Insurance Claim Assistant.

    Claim Information:
    {claim_data}

    User Message:
    {user_message}

    Your job:
    - assist user professionally
    - explain claim issues
    - ask follow-up questions
    - suggest required documents
    - guide next actions

    """

    completion = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "system",
                "content":
                "You are a helpful insurance claim AI."
            },

            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.5
    )

    return completion.choices[0].message.content