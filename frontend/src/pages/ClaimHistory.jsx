import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function ClaimHistory() {

  const [claims, setClaims] = useState([]);

  useEffect(() => {

    fetchClaims();

  }, []);

  const fetchClaims = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(

        "http://127.0.0.1:8000/claims/",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(response.data);

      setClaims(response.data);

    } catch (error) {

      console.log(error.response?.data);
    }
  };

  return (

    <div className="min-h-screen bg-cream">

      <Navbar />

      <div className="p-10">

        <h1 className="text-3xl font-bold mb-8">
          Claim History
        </h1>

        <div className="space-y-5">

          {claims.map((claim) => (

            <div
              key={claim.id}
              className="bg-white p-6 rounded-3xl shadow-lg"
            >

              <h2 className="text-2xl font-bold">
                {claim.insurance_type}
              </h2>

              <p className="mt-3">
                {claim.description}
              </p>

              <p className="mt-4 text-gray-500">
                Status: {claim.status}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ClaimHistory;