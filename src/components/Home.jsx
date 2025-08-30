import React, { useEffect } from "react";
import busImg from "../assets/google map 2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
// import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh(); // 👈 ensures animations reset properly
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center pt-20 px-6"
    >

      <h1 className="text-5xl font-bold mb-12 mt-10 text-center"
        data-aos="zoom-out"
      >
        Smart Transit System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-6">
        {/* Left */}
        <div
          className="flex justify-center flex-col items-center pl-20"
          data-aos="zoom-out"
        >
          <h2 className="text-4xl font-bold mb-4 text-center">
            Smart Bus Tracking & Seat Occupancy System
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 text-center">
            Track your bus in real-time, check available seats, and save time
            with Smart Innovators’ smart transport solution.
          </p>
          <ul className="mt-5">
            <li>
              <a
                href="#track"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
                style={{ textShadow: "1px 1px 2px yellow" }}
              >
                Start Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex justify-center"
          data-aos="zoom-out"
        >
          <img
            src={busImg}
            alt="Tracking"
            className="rounded-lg shadow-lg w-72"
          />
        </div>
      </div>
    </div>
  );
}


