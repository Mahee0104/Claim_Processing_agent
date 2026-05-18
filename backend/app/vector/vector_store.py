import faiss
import numpy as np
import os
import pickle

from app.vector.embedder import get_embedding

VECTOR_DIM = 384

INDEX_PATH = "vector.index"
META_PATH = "vector_meta.pkl"


class VectorStore:

    def __init__(self):

        self.index = faiss.IndexFlatL2(VECTOR_DIM)

        self.metadata = []

        # load existing FAISS
        if os.path.exists(INDEX_PATH):
            self.index = faiss.read_index(INDEX_PATH)

        # load metadata
        if os.path.exists(META_PATH):
            with open(META_PATH, "rb") as f:
                self.metadata = pickle.load(f)

    # -----------------------------------
    # ADD TEXT
    # -----------------------------------
    def add_text(self, text: str, meta: dict):

        embedding = get_embedding(text)

        if embedding is None:
            return None

        embedding = np.array([embedding]).astype("float32")

        self.index.add(embedding)

        # IMPORTANT
        # meta should contain:
        # claim_id
        # text
        # file_name
        self.metadata.append(meta)

        self._save()

        return len(self.metadata) - 1

    # -----------------------------------
    # SEARCH
    # -----------------------------------
    def search(self, query: str, claim_id=None, top_k=5):

        if self.index.ntotal == 0:
            return []

        q_emb = get_embedding(query)

        q_emb = np.array([q_emb]).astype("float32")

        distances, indices = self.index.search(q_emb, top_k)

        results = []

        for rank, idx in enumerate(indices[0]):

            if idx == -1:
                continue

            if idx >= len(self.metadata):
                continue

            meta = self.metadata[idx]

            # -----------------------------------
            # CLAIM FILTERING
            # -----------------------------------
            if claim_id is not None:

                if str(meta.get("claim_id")) != str(claim_id):
                    continue

            results.append({
                "score": float(distances[0][rank]),
                "claim_id": meta.get("claim_id"),
                "file_name": meta.get("file_name"),
                "text": meta.get("text")
            })

        return results

    # -----------------------------------
    # SAVE
    # -----------------------------------
    def _save(self):

        faiss.write_index(self.index, INDEX_PATH)

        with open(META_PATH, "wb") as f:
            pickle.dump(self.metadata, f)


vector_store = VectorStore()