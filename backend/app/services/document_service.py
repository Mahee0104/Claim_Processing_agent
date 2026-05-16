from app.config.mongodb import mongo_db
from datetime import datetime

def save_ocr_document(claim_id, file_name, file_type, extracted_text):

    # 🔥 SAFETY CHECK (ENSURES NO LOSS BEFORE DB)
    if extracted_text is None:
        extracted_text = ""

    extracted_text = str(extracted_text)  # ensure string ONLY

    document = {
        "claim_id": str(claim_id),
        "file_name": file_name,
        "file_type": file_type,
        "extracted_text": extracted_text,  # ❗ NO slicing EVER
        "text_length": len(extracted_text),  # debugging field
        "created_at": datetime.utcnow()
    }

    result = mongo_db["ocr_documents"].insert_one(document)

    return str(result.inserted_id)