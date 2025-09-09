// import React, { useEffect } from "react";
// import busImg from "../assets/google map 2.jpg";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { motion } from "framer-motion";

// export default function Home() {
//   useEffect(() => {
//     AOS.init({ duration: 1000, once: false });
//     AOS.refresh(); // 👈 ensures animations reset properly
//   }, []);

//   return (
//     <div
//       className="hero min-h-screen flex flex-col justify-center items-center px-6 pt-20"
//     >
//       <div className="flex justify-center">
//         <h1 className="text-3xl md:text-6xl pt-6 text-center font-bold mb-12 mt-8"
//           // data-aos="zoom-out"
//         >
//           Smart Transit System
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-6">
//         {/* Left */}
//         <div
//           className="flex justify-center flex-col items-center md:pl-20 order-2 md:order-1"
//           data-aos="zoom-out"
//         >
//           <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
//             Smart Bus Tracking & Seat Occupancy System
//           </h2>
//           <p className="text-lg mt-5 mb-8 text-center font-normal z-20">
//             Track your bus in real-time, check available seats, and save time
//             with Smart Innovators’ smart transport solution.
//           </p>
//           <ul>
//             <li>
//               <a
//                 href="#track"
//                 className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500"
//                 style={{ textShadow: "1px 1px 2px yellow" }}
//               >
//                 Start Tracking
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Right */}
//         <div className="flex justify-center order-1 mb-28 md:order-2 mr-12 md:mr-0"
//           data-aos="zoom-out"
//         >
//           <motion.div
//             whileHover={{
//               scale: 1.05
//             }}
//             initial={{
//               y: 0
//             }}
//             animate={{
//               x: [0, 50, 50, 0, 0],
//               y: [0, 0, 50, 50, 0]
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity
//             }}
//             className="w-64 h-64 md:mb-6"
//           >
//             <img
//               src={busImg}
//               alt="Tracking"
//               className="rounded-lg shadow-lg width-[100%]"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect } from "react";
import busImg from "../assets/google map 2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // SEO crawlers ke liye once:true better
    AOS.refresh();
  }, []);

  return (
    <main
      className="hero min-h-screen flex flex-col justify-center items-center px-6 pt-20"
    >
      {/* Heading */}
      <header className="flex justify-center">
        <h1 className="text-3xl md:text-6xl pt-6 text-center font-bold mb-12 mt-8">
          Smart Transit System
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-6">
        {/* Left */}
        <article
          className="flex justify-center flex-col items-center md:pl-20 order-2 md:order-1"
          data-aos="zoom-out"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            Smart Bus Tracking & Seat Occupancy System
          </h2>
          <p className="text-lg mt-5 mb-8 text-center font-normal z-20">
            Track your bus in real-time, check available seats, and save time
            with Smart Innovators’ smart transport solution.
          </p>
          <ul>
            <li>
              <a
                href="#track"
                aria-label="Start real-time bus tracking"
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors duration-200"
                style={{ textShadow: "1px 1px 2px yellow" }}
              >
                Start Tracking
              </a>
            </li>
          </ul>
        </article>

        {/* Right */}
        <div
          className="flex justify-center order-1 mb-28 md:order-2 mr-12 md:mr-0"
          data-aos="zoom-out"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ y: 0 }}
            animate={{
              x: [0, 50, 50, 0, 0],
              y: [0, 0, 50, 50, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-64 h-64 md:mb-6"
          >
            <img
              src={busImg}
              alt="Illustration of smart bus tracking system on map"
              loading="lazy" // performance boost 🚀
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
