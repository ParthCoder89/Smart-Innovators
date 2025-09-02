import React, { useState } from "react";

export default function Authform({ type, onClose, onAuthSuccess }) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (type === "signup" && !/^\d{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    const userData = { email, mobile };
    onAuthSuccess(userData);
    setEmail("");
    setMobile("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50" data-aos="fade-left">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
        role="button"
        aria-label="Close authentication form"
      ></div>
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-8 transform translate-x-0 transition-transform duration-300">
        <button
          className="absolute top-4 right-4 text-4xl font-bold text-gray-600 hover:text-red-600"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-gray-800 dark:text-white">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded mt-1 text-black dark:text-white dark:bg-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {type === "signup" && (
            <div>
              <label htmlFor="mobile" className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                id="mobile"
                type="text"
                className="w-full p-2 border rounded mt-1 text-black dark:text-white dark:bg-gray-800"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded mt-1 text-black dark:text-white dark:bg-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
            aria-label={type === "signin" ? "Sign in" : "Sign up"}
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}