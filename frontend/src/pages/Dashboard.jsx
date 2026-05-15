import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

  return (
    <div className="min-h-screen bg-cream">

      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link to="/chat">

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition">

              <h2 className="text-2xl font-semibold">
                AI Chat Assistant
              </h2>

            </div>

          </Link>

          <Link to="/register">

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition">

              <h2 className="text-2xl font-semibold">
                Register Claim
              </h2>

            </div>

          </Link>

          <Link to="/history">

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition">

              <h2 className="text-2xl font-semibold">
                Claim History
              </h2>

            </div>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;