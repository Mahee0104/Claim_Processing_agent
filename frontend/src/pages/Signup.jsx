import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://127.0.0.1:8000/auth/signup",

        {
          name: name.trim(),
          email: email.trim(),
          password: password.trim()
        }
      );

      console.log(
        "SIGNUP RESPONSE:",
        response.data
      );

      alert("Signup successful");

      navigate("/");

    } catch (error) {

      console.log(
        "FULL ERROR:",
        error
      );

      console.log(
        "BACKEND ERROR:",
        error.response?.data
      );

      alert(
        JSON.stringify(
          error.response?.data?.detail ||
          "Signup failed"
        )
      );
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-cream">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Signup
        </h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-xl mb-4"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            Signup
          </button>

        </form>

        <p className="mt-5 text-center">

          Already have an account?{" "}

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