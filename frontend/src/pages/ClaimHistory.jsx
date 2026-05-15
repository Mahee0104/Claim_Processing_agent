import Navbar from "../components/Navbar";
import ClaimCard from "../components/ClaimCard";

function ClaimHistory() {

  const claims = [
    {
      type: "Health Insurance",
      status: "Under Review",
    },

    {
      type: "Vehicle Insurance",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-8">
          Claim History
        </h1>

        <div className="space-y-5">

          {claims.map((claim, index) => (
            <ClaimCard
              key={index}
              type={claim.type}
              status={claim.status}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default ClaimHistory;