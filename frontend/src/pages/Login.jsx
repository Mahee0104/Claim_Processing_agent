import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error
      );

      console.log(
        "BACKEND ERROR:",
        error.response?.data
      );

      const errorMessage =
        error.response?.data?.detail ||
        "Login failed";

      alert(JSON.stringify(errorMessage));
    }
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
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl mb-6"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="w-full bg-primaryPink p-3 rounded-xl font-semibold"
          >
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