function ClaimCard({ type, status }) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-xl font-semibold mb-2">
        {type}
      </h2>

      <p>
        Status: {status}
      </p>

    </div>
  );
}

export default ClaimCard;