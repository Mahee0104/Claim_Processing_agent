import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cream">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Signup
        </h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl mb-6"
          />

          <button className="w-full bg-primaryPink p-3 rounded-xl font-semibold">
            Create Account
          </button>

        </form>

        <p className="mt-5 text-center">

          Already have account?{" "}

          <Link
            to="/"
            className="text-pink-500"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;