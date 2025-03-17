import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError("Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token); // Save token in local storage
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left: Developer Login */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Developer Login</h2>
        <form onSubmit={handleLogin} className="w-3/4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400">
            Register Now
          </a>
        </p>
      </div>

      {/* Right: Enterprise Login */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Company / Enterprise Login
        </h2>
        <p className="text-gray-700 text-center">
          Secure access for businesses managing security analytics.
        </p>
      </div>
    </div>
  );
};

export default Login;
