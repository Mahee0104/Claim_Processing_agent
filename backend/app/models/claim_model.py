from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.config.database import Base


class Claim(Base):

    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)

    insurance_type = Column(String)

    description = Column(String)

    status = Column(String, default="Pending")