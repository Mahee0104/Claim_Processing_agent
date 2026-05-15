import Navbar from "../components/Navbar";

function RegisterClaim() {

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <div className="p-10">

        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Register Claim
          </h1>

          <input
            type="text"
            placeholder="Insurance Type"
            className="w-full border p-3 rounded-xl mb-4"
          />

          <textarea
            placeholder="Describe your issue..."
            className="w-full border p-3 rounded-xl h-40 mb-4"
          />

          <input
            type="file"
            className="mb-6"
          />

          <button className="bg-primaryPink px-8 py-3 rounded-xl">
            Submit Claim
          </button>

        </div>

      </div>

    </div>
  );
}

export default RegisterClaim;