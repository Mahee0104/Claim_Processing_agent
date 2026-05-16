import easyocr
import numpy as np
import cv2
import io
import fitz  # PyMuPDF
from PIL import Image

# ----------------------------
# OCR ENGINE
# ----------------------------
reader = easyocr.Reader(['en'], gpu=False)


# ----------------------------
# SAFE PREPROCESSING (IMPORTANT FIX)
# ----------------------------
def preprocess(image_np):
    """
    Keep preprocessing LIGHT.
    Heavy thresholding destroys OCR accuracy.
    """

    gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)

    # light denoising only
    gray = cv2.bilateralFilter(gray, 7, 50, 50)

    # normalize contrast slightly
    gray = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)

    return gray


# ----------------------------
# IMAGE OCR
# ----------------------------
def ocr_image(file_bytes: bytes):

    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    image_np = np.array(image)

    processed = preprocess(image_np)

    result = reader.readtext(processed, detail=1)

    # filter low-confidence noise
    text = " ".join([r[1] for r in result if r[2] > 0.3])

    return text.strip()


# ----------------------------
# PDF OCR (IMPROVED STABILITY)
# ----------------------------
def ocr_pdf(file_bytes: bytes):

    doc = fitz.open(stream=file_bytes, filetype="pdf")
    full_text = []

    for page in doc:

        pix = page.get_pixmap()

        img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(
            pix.height,
            pix.width,
            pix.n
        )

        # RGBA → RGB fix
        if pix.n == 4:
            img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)

        # sometimes PyMuPDF gives weird channel ordering
        if pix.n == 3:
            img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        processed = preprocess(img)

        result = reader.readtext(processed, detail=1)

        page_text = " ".join([r[1] for r in result if r[2] > 0.3])

        if page_text.strip():
            full_text.append(page_text)

    return "\n".join(full_text).strip()


# ----------------------------
# MAIN FUNCTION
# ----------------------------
def extract_text(file_bytes: bytes, content_type: str):

    if content_type in ["image/png", "image/jpeg", "image/jpg"]:
        return ocr_image(file_bytes)

    elif content_type == "application/pdf":
        return ocr_pdf(file_bytes)

    else:
        raise ValueError("Unsupported file type")