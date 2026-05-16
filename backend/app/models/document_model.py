from sqlalchemy import Column, Integer, String
from app.config.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer)
    filename = Column(String)
    filepath = Column(String)
    filetype = Column(String)
    