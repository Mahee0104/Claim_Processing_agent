from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    claim_id: int
    filename: str
    filepath: str
    filetype: str

    class Config:
        from_attributes = True