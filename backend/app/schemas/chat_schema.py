from pydantic import BaseModel


class ChatRequest(BaseModel):

    message: str

    claim_id: int