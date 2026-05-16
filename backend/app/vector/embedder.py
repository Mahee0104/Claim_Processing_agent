from sentence_transformers import SentenceTransformer

# lightweight & good model
model = SentenceTransformer("all-MiniLM-L6-v2")


def get_embedding(text: str):
    if not text:
        return None

    return model.encode(text, convert_to_numpy=True)