import React, { useState } from "react";
import BubblesBackground from "../components/BubblesBackground";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../apiLayer/index";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const userData = await loginUser(usernameOrEmail, password);

      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setSuccessMessage("Login successful!");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <BubblesBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center bg-transparent">
        <div className="flex items-center mb-8">
          <img
            src=".././public/icon.png"
            alt="Efficio Logo"
            className="w-32 h-32"
          />
          <h1 className="text-[60px] sm:text-[80px] md:text-[100px] font-extrabold text-[#1f2937] leading-none">
            Efficio
          </h1>
        </div>

        <div className="bg-[#ffffff] p-8 rounded shadow-md w-full max-w-md animate-slideIn relative z-20">
          <h2 className="text-2xl font-bold text-[#1f2937] mb-6">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#1f2937]">Username or Email</label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your username or email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[#1f2937]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1f2937] text-[#ffffff] py-2 rounded hover:bg-opacity-90"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-[#1f2937]">
            Not registered yet?{" "}
            <Link to="/signup">
              <span className="text-blue-500 hover:underline">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
