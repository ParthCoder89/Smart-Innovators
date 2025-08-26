import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Header({ darkMode, setDarkMode }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false }); // 👈 animations trigger every time
  }, []);
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-yellow-400 dark:bg-gray-800 fixed top-0 left-0 w-full z-50" data-aos="zoom-out">
      {/* Left - Logo */}
      <div className="font-bold text-2xl" data-aos="fade-right">Smart Innovators</div>

      {/* Center - Menu */}
      <ul className="hidden md:flex gap-6 font-semibold py-2" data-aos="zoom-out">
        <li><a href="#home" className="hover:text-white font-bold ">Home</a></li>
        <li><a href="#track" className="hover:text-white font-bold ">Track Bus</a></li>
        <li><a href="#seats" className="hover:text-white font-bold ">Seat Details</a></li>
        <li><a href="#about" className="hover:text-white font-bold ">About Us</a></li>
        <li><a href="#contact" className="hover:text-white font-bold ">Contact Us</a></li>
      </ul>

      {/* Right - Mode + Auth */}
      <div className="flex items-center gap-6" data-aos="fade-left">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button className="bg-white dark:bg-gray-700 text-black dark:text-white px-4 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
          Sign In
        </button>
        <button className="bg-orange-600 text-white px-4 py-1 rounded-lg hover:bg-orange-500">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
