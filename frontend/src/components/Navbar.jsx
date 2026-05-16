import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged out successfully");

    navigate("/");
  };

  return (

    <div className="flex justify-between items-center px-10 py-5 bg-white shadow-md">

      <h1 className="text-2xl font-bold text-pink-500">
        Claim AI
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/register-claim">
          Register Claim
        </Link>

        <Link to="/claim-history">
          Claims
        </Link>

        <Link to="/chat">
          Chat
        </Link>

        <button
          onClick={handleLogout}
          className="bg-primaryPink px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;