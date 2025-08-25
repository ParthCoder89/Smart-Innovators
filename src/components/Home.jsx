// import React from 'react'
// import GoogleMap from './assets/google map 2.jpg'

// const Home = () => {
//     return (
//         <section id="home" className="flex justify-between items-center px-10 h-screen text-white">
//             {/* Left Content */}
//             <div className="w-1/2 space-y-6 ml-[3vw]" style={{textShadow: '3px 3px 4px red'}}>
//                 <h1 className="text-4xl font-bold">
//                     Smart Bus Tracking & Seat Occupancy System
//                 </h1>
//                 <p className="text-lg text-gray-200">
//                     Track your bus in real-time, check available seats, and save time with
//                     Smart Innovators’ smart transport solution.
//                 </p>
//                 <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500" style={{textShadow: '1px 2px 2px yellow'}}>
//                     Start Tracking
//                 </button>
//             </div>

//             {/* Right Content (Image/Illustration placeholder) */}
//             <div className="w-1/2 flex justify-center google-map-image-div">
//                 <img
//                     src={GoogleMap}
//                     alt="GoodleMap photo"
//                     className="w-56 rounded-xl mt-10 ml-[10vw]"
//                 />
//             </div>
//         </section>
//     )
// }

// export default Home


// components/Home.jsx
import React from "react";
import busImg from "../assets/google map 2.jpg"; // replace with your image
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-20 px-6"  data-aos = "zoom-out">
      <h1 className="text-5xl font-bold mb-12 mt-10 text-center">
        Smart Transit System
      </h1>
      <div className="grid md:grid-cols-2 gap-10 items-center mt-6">
        {/* Left */}
        <div className="flex justify-center flex-col items-center pl-20" data-aos = "fade-right">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Smart Bus Tracking & Seat Occupancy System
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300 text-center">
            Track your bus in real-time, check available seats, and save time
            with Smart Innovators’ smart transport solution.
          </p>
          <button
            className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
            style={{ textShadow: "1px 2px 2px yellow" }}
          >
            Start Tracking
          </button>
        </div>

        {/* Right */}
        <div className="flex justify-center" data-aos = "fade-left">
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
