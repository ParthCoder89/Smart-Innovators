// import React, { useState } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa'; // React Icons for night/day toggle

// const Header = () => {
//   const [darkMode, setDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     // Optional: add dark/light theme change logic here for the entire app
//     document.documentElement.classList.toggle('dark', !darkMode);
//   };

//   return (
//     <nav className="flex items-center justify-between bg-yellow-800 p-4 text-white fixed top-0 left-0 w-full z-50"> 
      
//       {/* Left - Team Name */}
//       <div className="text-2xl ml-4 font-bold">Smart Innovators</div>

//       {/* Center - Menu */}
//       <ul className="flex gap-14 font-bold">
//         <li><a href="#home" className="hover:text-gray-200">Home</a></li>
//         <li><a href="#track" className="hover:text-gray-200">Track Bus</a></li>
//         <li><a href="#seats" className="hover:text-gray-200">Seat Status</a></li>
//         <li><a href="#about" className="hover:text-gray-200">About</a></li>
//       </ul>

//       {/* Right - Theme Toggle & Sign In */}
//       <div className="flex items-center gap-4 mr-3">
//         {/* Theme Toggle Icon */}
//         <button 
//           onClick={toggleDarkMode} 
//           className="text-white text-xl hover:text-gray-200 transition mr-7"
//           title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
//         >
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>

//         {/* Sign In Button */}
//         <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">
//           Sign In
//         </button>
//       </div>
//     </nav>
//   );
// };
// export default Header;


// components/Navbar.jsx


import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-yellow-400 dark:bg-gray-800 fixed top-0 left-0 w-full z-50">
      {/* Left - Logo */}
      <div className="font-bold text-2xl">Smart Innovators</div>

      {/* Center - Menu */}
      <ul className="hidden md:flex gap-6 font-semibold py-2">
        <li><a href="#home" className="hover:text-white font-bold ">Home</a></li>
        <li><a href="#track" className="hover:text-white font-bold ">Track Bus</a></li>
        <li><a href="#seats" className="hover:text-white font-bold ">Seat Details</a></li>
        <li><a href="#about" className="hover:text-white font-bold ">About Us</a></li>
        <li><a href="#contact" className="hover:text-white font-bold ">Contact Us</a></li>
      </ul>

      {/* Right - Mode + Auth */}
      <div className="flex items-center gap-6">
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
