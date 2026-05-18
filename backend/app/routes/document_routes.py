import os
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session

from app.config.database import SessionLocal
from app.models.document_model import Document
from app.config.mongodb import mongo_db
router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "uploads/claims"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/upload")
async def upload_document(
    claim_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    allowed_types = [
        "application/pdf",
        "image/png",
        "image/jpeg"
    ]

    if file.content_type not in allowed_types:
        return {
            "error": "Unsupported file type"
        }

    unique_filename = f"{uuid.uuid4()}_{file.filename}"

    file_path = f"{UPLOAD_DIR}/{unique_filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_doc = Document(
        claim_id=claim_id,
        filename=unique_filename,
        filepath=file_path,
        filetype=file.content_type
    )

    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)

    return {
        "message": "File uploaded successfully",
        "document_id": new_doc.id,
        "file_path": file_path
    }

@router.get("/ocr/{claim_id}")
def get_ocr_by_claim(claim_id: str):
    docs = list(
        mongo_db["ocr_documents"].find({"claim_id": claim_id})
    )

    for d in docs:
        d["_id"] = str(d["_id"])

    return {
        "claim_id": claim_id,
        "documents": docs
    }