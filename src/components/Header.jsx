import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthForm from "./Authform";
import Logo from '../assets/logo.png'

export default function Header({ darkMode, setDarkMode }) {
  const [showAuth, setShowAuth] = useState(false);
  const [shownav, setshowNav] = useState(false)
  const [authType, setAuthType] = useState("signin"); // "signin" or "signup"
  const [user, setUser] = useState(null); // stores signed in user details

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-500 dark:bg-gray-800 fixed top-0 left-0 w-full z-50" data-aos="zoom-out">
        {/* Left - Logo */}
        {/* <div className="font-bold " data-aos="fade-right">Smart Innovators</div> */}
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
            // If signed in → show email instead of buttons
            <span className="bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-1 rounded-lg">
              {user.email}
            </span>
          ) : (
            <div className="flex flex-col items-center ml-10 gap-1">
              <button
                onClick={() => { setAuthType("signin"); setShowAuth(true); }}
                className="bg-white dark:bg-gray-700 text-black dark:text-white px-2 py-[3px] md:px-4 md:py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Sign In
              </button>
              <p className="font-semibold text-[9px] md:text-[13px]" 
              >
                New User ?
                <button
                  className="text-yellow-400 pl-1"
                  onClick={() => { setAuthType("signup"); setShowAuth(true); }}>
                  Sign Up Here
                </button>
              </p>
              {/* <button
                onClick={() => { setAuthType("signup"); setShowAuth(true); }}
                className="bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-orange-500"
              >
                Sign Up
              </button> */}
            </div>
          )}
          <button
            onClick={() => setshowNav(!shownav)}
            className="ml-5 md:ml-10 text-2xl md:text-3xl md:hidden"
          >
            &#9776;
          </button>
          <div className={`slide-nav ${shownav ? "active-slide-nav" : ""}  fixed z-50 bg-gray-600 text-white `}>
            <button className="text-2xl absolute top-4 right-4 font-bold" onClick={() => { setshowNav(!shownav) }}>
              ×
            </button>
            <ul className="flex flex-col items-center gap-4 mt-20 font-medium text-xl px-20">
              <li><a href="#home" className="hover:text-white font-bold">Home</a></li>
              <li><a href="#track" className="hover:text-white font-bold">Track Bus</a></li>
              <li><a href="#seats" className="hover:text-white font-bold">Seat Details</a></li>
              <li><a href="#about" className="hover:text-white font-bold">About Us</a></li>
              <li><a href="#contact" className="hover:text-white font-bold">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Auth Form Drawer */}
      {showAuth && (
        <AuthForm
          type={authType}
          onClose={() => setShowAuth(false)}
          onAuthSuccess={(userData) => {
            setUser(userData);
            setShowAuth(false);
          }}
        />
      )}
    </>
  );
}

