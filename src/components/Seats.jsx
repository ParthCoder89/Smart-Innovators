// import React, { useState, useEffect } from "react";
// import SeatsJpg from "../assets/Seats.jpg";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const buses = [
//     { id: "Bus 101", seats: 50, occupied: 48 },
//     { id: "Bus 102", seats: 50, occupied: 30 },
//     { id: "Bus 103", seats: 50, occupied: 10 },
// ];

// export default function SeatDetails() {
//     const [selectedBus, setSelectedBus] = useState(buses[0]);

//     const availableSeats = selectedBus.seats - selectedBus.occupied;

//     useEffect(() => {
//         AOS.init({
//             duration: 500,
//             once: false,  
//         });
//     }, []);

//     return (
//         <div
//             id="seats"
//             className="min-h-screen px-6 pt-10 pb-10 bg-gray-50 dark:bg-gray-900"
//         >
//             <h2 className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white" data-aos="zoom-out">
//                 Seat Details
//             </h2>

//             <div className="grid  md:grid-cols-3 gap-12" data-aos="zoom-out">
//                 {/* First Column */}
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
//                     <label className="text-xl block mb-4 text-gray-800 dark:text-gray-200 font-semibold">
//                         Select Bus:
//                     </label>
//                     <select
//                         onChange={(e) =>
//                             setSelectedBus(
//                                 buses.find((bus) => bus.id === e.target.value) || buses[0]
//                             )
//                         }
//                         className="p-2 rounded w-full text-black"
//                         style={{ border: "2px solid red" }}
//                         value={selectedBus.id}
//                     >
//                         {buses.map((bus) => (
//                             <option key={bus.id} value={bus.id}>
//                                 {bus.id}
//                             </option>
//                         ))}
//                     </select>

//                     <div className="mt-10">
//                         <img
//                             src={SeatsJpg}
//                             alt="Bus Seat Layout"
//                             className="mx-auto w-72 rounded-2xl"
//                         />
//                     </div>
//                     <div className="mt-16 text-center">
//                         <ul >
//                             <li>
//                                 <a href="" className="py-4 px-8 md:px-3 bg-orange-500 rounded-lg text-[11.5px] text-white text-center font-bold hover:bg-orange-400">
//                                     Book Your Seat
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Second Column */}
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full" data-aos="zoom-out">
//                     <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
//                         Seat Layout
//                     </h3>
//                     <div className="grid grid-cols-5 gap-3 justify-items-center">
//                         {Array.from({ length: selectedBus.seats }).map((_, index) => (
//                             <div
//                                 key={index}
//                                 className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${index < selectedBus.occupied
//                                         ? "bg-red-500 text-white"
//                                         : "bg-green-500 text-white"
//                                     }`}
//                             >
//                                 {index + 1}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Third Column */}
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mr-10 w-full" data-aos="zoom-out">
//                     <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
//                         Seats Details
//                     </h3>
//                     <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-4">
//                         <strong>Occupied :</strong> {selectedBus.occupied} /{" "}
//                         {selectedBus.seats}
//                     </p>
//                     <p className="text-lg text-gray-700 dark:text-gray-300 ml-4">
//                         <strong>Available :</strong> {availableSeats} /{" "}
//                         {selectedBus.seats}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect, useMemo } from "react";
import SeatsJpg from "../assets/Seats.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const buses = [
  { id: "Bus 101", seats: 50, occupied: 48 },
  { id: "Bus 102", seats: 50, occupied: 30 },
  { id: "Bus 103", seats: 50, occupied: 10 },
];

export default function SeatDetails() {
  const [selectedBus, setSelectedBus] = useState(buses[0]);

  const availableSeats = useMemo(
    () => selectedBus.seats - selectedBus.occupied,
    [selectedBus]
  );

  const seatLayout = useMemo(
    () =>
      Array.from({ length: selectedBus.seats }).map((_, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
            index < selectedBus.occupied
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
          aria-label={`Seat ${index + 1} ${
            index < selectedBus.occupied ? "Occupied" : "Available"
          }`}
        >
          {index + 1}
        </div>
      )),
    [selectedBus]
  );

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: false,
    });
  }, []);

  return (
    <section
      id="seats"
      className="min-h-screen px-6 pt-10 pb-10 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="seat-section-title"
    >
      <h2
        id="seat-section-title"
        className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white"
        data-aos="zoom-out"
      >
        Seat Details
      </h2>

      <div className="grid md:grid-cols-3 gap-12" data-aos="zoom-out">
        {/* First Column */}
        <article
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
          aria-labelledby="select-bus-title"
        >
          <label
            id="select-bus-title"
            className="text-xl block mb-4 text-gray-800 dark:text-gray-200 font-semibold"
          >
            Select Bus:
          </label>
          <select
            onChange={(e) =>
              setSelectedBus(
                buses.find((bus) => bus.id === e.target.value) || buses[0]
              )
            }
            className="p-2 rounded w-full text-black border-2 border-red-500"
            value={selectedBus.id}
            aria-label="Select a bus"
          >
            {buses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.id}
              </option>
            ))}
          </select>

          <div className="mt-10">
            <img
              src={SeatsJpg}
              alt={`Seat layout diagram for ${selectedBus.id}`}
              className="mx-auto w-72 rounded-2xl"
              loading="lazy"
            />
          </div>
          <div className="mt-16 text-center">
            <button
              type="button"
              className="py-4 px-8 md:px-3 bg-orange-500 rounded-lg text-[11.5px] text-white font-bold hover:bg-orange-400"
              aria-label="Book your seat"
            >
              Book Your Seat
            </button>
          </div>
        </article>

        {/* Second Column */}
        <article
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
          aria-labelledby="seat-layout-title"
          data-aos="zoom-out"
        >
          <h3
            id="seat-layout-title"
            className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center"
          >
            Seat Layout
          </h3>
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {seatLayout}
          </div>
        </article>

        {/* Third Column */}
        <article
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mr-10 w-full"
          aria-labelledby="seat-info-title"
          data-aos="zoom-out"
        >
          <h3
            id="seat-info-title"
            className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center"
          >
            Seats Details
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-4">
            <strong>Occupied:</strong> {selectedBus.occupied} /{" "}
            {selectedBus.seats}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 ml-4">
            <strong>Available:</strong> {availableSeats} /{" "}
            {selectedBus.seats}
          </p>
        </article>
      </div>
    </section>
  );
}
