from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.ocr_service import extract_text
from app.services.document_service import save_ocr_document
from app.vector.vector_store import vector_store
router = APIRouter(prefix="/ocr", tags=["OCR"])


@router.post("/extract")
async def extract_and_store(file: UploadFile = File(...), claim_id: str = Form(None)):

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty file")

    try:
        text = extract_text(file_bytes, file.content_type)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"OCR failed: {str(e)}")

    doc_id = save_ocr_document(
        claim_id=claim_id,
        file_name=file.filename,
        file_type=file.content_type,
        extracted_text=text
    )
    vector_store.add_text(
        text=text,
        meta={
            "claim_id": claim_id,
            "document_id": doc_id,
            "file_name": file.filename
        }
    )

    return {
        "message": "OCR success",
        "document_id": str(doc_id),
        "claim_id": claim_id,
        "extracted_text": text
    }