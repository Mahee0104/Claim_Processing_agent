import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function RegisterClaim() {
  const [insuranceType, setInsuranceType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbOCR, setDbOCR] = useState(null);

  // 🔥 NEW: fetch OCR from MongoDB
  const fetchOCRFromDB = async (claimId) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/documents/ocr/${claimId}`
      );

      console.log("OCR FROM DB:", res.data);
      setDbOCR(res.data?.documents || []);
    } catch (err) {
      console.log("DB FETCH ERROR:", err.response?.data || err.message);
    }
  };

  const handleCreateClaim = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not logged in");
        return;
      }

      // 1️⃣ CREATE CLAIM
      const claimResponse = await axios.post(
        "http://127.0.0.1:8000/claims/create",
        {
          insurance_type: insuranceType,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CLAIM CREATED:", claimResponse.data);

      const claimId =
        claimResponse.data?.claim?.id ||
        claimResponse.data?.claim?._id ||
        claimResponse.data?.inserted_id;

      if (!claimId) {
        throw new Error("Claim ID not returned from backend");
      }

      // 2️⃣ OCR CALL
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("claim_id", claimId);

        const ocrResponse = await axios.post(
          "http://127.0.0.1:8000/ocr/extract",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("OCR RESPONSE:", ocrResponse.data);

        setOcrText(ocrResponse.data?.extracted_text || "");

        // 🔥 3️⃣ FETCH FROM MONGODB (NEW STEP)
        await fetchOCRFromDB(claimId);
      }

      alert("Claim submitted successfully!");

      setInsuranceType("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);

      alert(
        error.response?.data?.detail ||
          error.message ||
          "Claim submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <div className="p-10">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Register Claim
          </h1>

          <form onSubmit={handleCreateClaim}>
            <input
              type="text"
              placeholder="Insurance Type"
              className="w-full border p-3 rounded-xl mb-4"
              value={insuranceType}
              onChange={(e) => setInsuranceType(e.target.value)}
              required
            />

            <textarea
              placeholder="Describe your issue..."
              className="w-full border p-3 rounded-xl h-40 mb-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="file"
              className="mb-6"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              type="submit"
              className="bg-primaryPink px-8 py-3 rounded-xl text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Claim"}
            </button>
          </form>

          {/* OCR RESULT */}
          {ocrText && (
            <div className="mt-6 p-4 bg-gray-100 rounded-xl">
              <h2 className="font-bold mb-2">
                Extracted OCR Text (Live Response):
              </h2>
              <p className="text-sm whitespace-pre-wrap">
                {ocrText}
              </p>
            </div>
          )}

          {/* DB RESULT */}
          {dbOCR && dbOCR.length > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <h2 className="font-bold mb-2">
                OCR Stored in MongoDB:
              </h2>

              {dbOCR.map((doc, index) => (
                <div key={index} className="mb-3">
                  <p className="text-xs text-gray-500">
                    File: {doc.file_name}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {doc.extracted_text}
                  </p>
                  <hr className="my-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterClaim;