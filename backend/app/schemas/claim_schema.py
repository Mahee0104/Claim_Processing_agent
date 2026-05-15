from pydantic import BaseModel


class ClaimCreate(BaseModel):

    insurance_type: str

    description: str