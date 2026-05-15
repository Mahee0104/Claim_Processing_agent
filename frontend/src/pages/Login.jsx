import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cream">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin}>

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
            Login
          </button>

        </form>

        <p className="mt-5 text-center">
          No account?{" "}

          <Link
            to="/signup"
            className="text-pink-500"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;