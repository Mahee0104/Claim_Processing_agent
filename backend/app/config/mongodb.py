from pymongo import MongoClient

MONGO_URI = "mongodb://localhost:27017"

client = MongoClient(MONGO_URI)

mongo_db = client["claim_processing_db"]

# collections
users_collection = mongo_db["users"]
claims_collection = mongo_db["claims"]
ocr_documents_collection = mongo_db["ocr_documents"]