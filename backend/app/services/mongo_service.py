from app.config.mongodb import (
    users_collection,
    claims_collection,
    ocr_documents_collection
)

from datetime import datetime


# -----------------------------
# USER STORAGE (FIX FOR YOUR ERROR)
# -----------------------------
def store_user_mongo(user_data: dict):
    user_data["created_at"] = datetime.utcnow()
    result = users_collection.insert_one(user_data)
    return str(result.inserted_id)


# -----------------------------
# CLAIM STORAGE
# -----------------------------
def store_claim_mongo(claim_data: dict):
    claim_data["created_at"] = datetime.utcnow()
    result = claims_collection.insert_one(claim_data)
    return str(result.inserted_id)


# -----------------------------
# OCR STORAGE
# -----------------------------
def store_ocr_mongo(ocr_data: dict):
    ocr_data["created_at"] = datetime.utcnow()
    result = ocr_documents_collection.insert_one(ocr_data)
    return str(result.inserted_id)