import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-darkText">
        AI Claim Assistant
      </h1>

      <div className="flex gap-6">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/chat">
          Chat
        </Link>

        <Link to="/register">
          Register Claim
        </Link>

        <Link to="/history">
          Claims
        </Link>

      </div>

    </div>
  );
}

export default Navbar;