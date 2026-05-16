import faiss
import numpy as np
import os
import pickle

from app.vector.embedder import get_embedding

VECTOR_DIM = 384  # for MiniLM-L6-v2

INDEX_PATH = "vector.index"
META_PATH = "vector_meta.pkl"


class VectorStore:

    def __init__(self):
        self.index = faiss.IndexFlatL2(VECTOR_DIM)

        self.metadata = []  # stores claim_id + text reference

        # load if exists
        if os.path.exists(INDEX_PATH):
            self.index = faiss.read_index(INDEX_PATH)

        if os.path.exists(META_PATH):
            with open(META_PATH, "rb") as f:
                self.metadata = pickle.load(f)

    def add_text(self, text: str, meta: dict):

        embedding = get_embedding(text)

        if embedding is None:
            return None

        embedding = np.array([embedding]).astype("float32")

        self.index.add(embedding)
        self.metadata.append(meta)

        self._save()

        return len(self.metadata) - 1

    def search(self, query: str, top_k=5):

        q_emb = get_embedding(query)
        q_emb = np.array([q_emb]).astype("float32")

        distances, indices = self.index.search(q_emb, top_k)

        results = []

        for i in indices[0]:
            if i < len(self.metadata):
                results.append(self.metadata[i])

        return results

    def _save(self):
        faiss.write_index(self.index, INDEX_PATH)

        with open(META_PATH, "wb") as f:
            pickle.dump(self.metadata, f)


vector_store = VectorStore()