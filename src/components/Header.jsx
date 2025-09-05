import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthForm from "./Authform";
import Logo from '../assets/logo.png';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header({ darkMode, setDarkMode }) {
  const [showAuth, setShowAuth] = useState(false);
  const [shownav, setshowNav] = useState(false);
  const [authType, setAuthType] = useState("signin"); // "signin" or "signup"
  const [user, setUser] = useState(null); // Stores signed-in user details

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleAuthForm = (type) => {
    setAuthType(type);
    setShowAuth(true);
  };

  const handleAuthSuccess = (userData) => {
    setShowAuth(false);
    setUser({ email: userData.email });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-500 dark:bg-gray-800 fixed top-0 left-0 w-full z-50" data-aos="zoom-out">
        {/* Left - Logo */}
        <img src={Logo} alt="Our Team Logo" className="w-20 md:w-24 -ml-5 drop-shadow-[1px_1px_1px_white]"/>

        {/* Center - Menu */}
        <ul className="hidden md:flex gap-6 font-semibold py-2 text-[14px]" data-aos="zoom-out">
          <li><a href="#home" className="hover:text-white font-bold">Home</a></li>
          <li><a href="#track" className="hover:text-white font-bold">Track Bus</a></li>
          <li><a href="#seats" className="hover:text-white font-bold">Seat Details</a></li>
          <li><a href="#about" className="hover:text-white font-bold">About Us</a></li>
          <li><a href="#contact" className="hover:text-white font-bold">Contact Us</a></li>
        </ul>

        {/* Right - Mode + Auth */}
        <div className="flex items-center" data-aos="fade-left">
          <button onClick={() => setDarkMode(!darkMode)} className="md:text-xl -mr-3 md:mr-0">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user ? (
            <div className="flex items-center ml-10 gap-2">
              <span className="bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-1 rounded-lg">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center ml-10 gap-2">
              <button
                onClick={() => toggleAuthForm("signin")}
                className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-500"
              >
                Sign In
              </button>
              <button
                onClick={() => toggleAuthForm("signup")}
                className="bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-orange-500"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-2xl text-white"
            onClick={() => setshowNav(!shownav)}
            aria-label="Toggle mobile menu"
          >
            {shownav ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div
        className={`slide-nav bg-blue-500 dark:bg-gray-800 text-white md:hidden z-40 ${shownav ? "active-slide-nav" : ""}`}
        style={{ border: "1px solid white" }}
      >
        <ul className="flex flex-col gap-6 font-semibold text-center text-[14px] mt-20">
          <li>
            <a href="#home" className="hover:text-gray-300" onClick={() => setshowNav(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#track" className="hover:text-gray-300" onClick={() => setshowNav(false)}>
              Track Bus
            </a>
          </li>
          <li>
            <a href="#seats" className="hover:text-gray-300" onClick={() => setshowNav(false)}>
              Seat Details
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-300" onClick={() => setshowNav(false)}>
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-300" onClick={() => setshowNav(false)}>
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* Auth Form */}
      {showAuth && (
        <AuthForm
          type={authType}
          onClose={() => setShowAuth(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}