// import React, { useState } from "react";

// export default function PlanJourney({ onRouteSelect }) {
//   const [from, setFrom] = useState("central_station");
//   const [to, setTo] = useState("north_terminal");
//   const [passengers, setPassengers] = useState(1);
//   const [fare, setFare] = useState(null);
//   const [routeDetails, setRouteDetails] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const stations = {
//     central_station: { lat: 28.7041, lng: 77.1025, name: "Central Station" },
//     north_terminal: { lat: 28.4595, lng: 77.0266, name: "North Terminal" },
//     south_plaza: { lat: 28.5355, lng: 77.391, name: "South Plaza" },
//     east_gate: { lat: 28.6507, lng: 77.231, name: "East Gate" },
//     west_end: { lat: 28.6692, lng: 77.089, name: "West End" },
//   };

//   const handleCalculate = () => {
//     if (!from || !to) {
//       alert("Please select both starting point and destination.");
//       return;
//     }

//     const baseFare = 50;
//     const farePerStop = 15;
//     const options = ["central_station", "north_terminal", "south_plaza", "east_gate", "west_end"];
//     const stops = Math.abs(options.indexOf(from) - options.indexOf(to));
//     const totalFare = (baseFare + farePerStop * stops) * parseInt(passengers);

//     setFare(totalFare.toFixed(2));
//     const fromText = stations[from].name;
//     const toText = stations[to].name;
//     setRouteDetails(`${fromText} to ${toText}`);

//     onRouteSelect({
//       from: stations[from],
//       to: stations[to],
//     });
//   };

//   const handlePayment = () => {
//     setShowModal(true);
//   };

//   return (
//     <div className="w-[80vw] mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
//       <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
//         Plan Your Journey
//       </h2>
//       <div className="grid grid-cols-2 gap-6 mb-6">
//         <div className="text-left">
//           <label htmlFor="from" className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
//             From
//           </label>
//           <select
//             id="from"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
//             aria-label="Select starting location"
//           >
//             {Object.keys(stations).map((key) => (
//               <option key={key} value={key}>
//                 {stations[key].name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="text-left">
//           <label htmlFor="to" className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
//             To
//           </label>
//           <select
//             id="to"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
//             aria-label="Select destination"
//           >
//             {Object.keys(stations).map((key) => (
//               <option key={key} value={key}>
//                 {stations[key].name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="flex items-end justify-between gap-6 mb-6">
//         <div className="flex-1 text-left">
//           <label
//             htmlFor="passengers"
//             className="block mb-2 font-medium text-gray-600 dark:text-gray-300"
//           >
//             Passengers
//           </label>
//           <select
//             id="passengers"
//             value={passengers}
//             onChange={(e) => setPassengers(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
//             aria-label="Select number of passengers"
//           >
//             {[1, 2, 3, 4, 5].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="button"
//           onClick={handleCalculate}
//           className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
//           aria-label="Calculate fare"
//         >
//           Calculate Fare <i className="fas fa-calculator ml-2"></i>
//         </button>
//       </div>
//       {fare && (
//         <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Your Fare</h3>
//               <p className="text-gray-500 dark:text-gray-400">{routeDetails}</p>
//             </div>
//             <div className="text-2xl font-bold text-green-600">₹{fare}</div>
//           </div>
//           <button
//             type="button"
//             onClick={handlePayment}
//             className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
//             aria-label="Pay now"
//           >
//             Pay Now <i className="fas fa-arrow-right ml-2"></i>
//           </button>
//         </div>
//       )}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
//             <div className="text-green-500 text-5xl mb-3">
//               <i className="fas fa-check-circle"></i>
//             </div>
//             <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Payment Successful!</h3>
//             <p className="text-gray-600 dark:text-gray-400 mb-4">
//               Your transaction has been completed successfully. Your tickets have been sent to your email.
//             </p>
//             <button
//               type="button"
//               onClick={() => setShowModal(false)}
//               className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//               aria-label="Close payment confirmation"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useState, useMemo } from "react";

export default function PlanJourney({ onRouteSelect }) {
  const [from, setFrom] = useState("central_station");
  const [to, setTo] = useState("north_terminal");
  const [passengers, setPassengers] = useState(1);
  const [fare, setFare] = useState(null);
  const [routeDetails, setRouteDetails] = useState("");
  const [showModal, setShowModal] = useState(false);

  const stations = useMemo(() => ({
    central_station: { lat: 28.7041, lng: 77.1025, name: "Central Station" },
    north_terminal: { lat: 28.4595, lng: 77.0266, name: "North Terminal" },
    south_plaza: { lat: 28.5355, lng: 77.391, name: "South Plaza" },
    east_gate: { lat: 28.6507, lng: 77.231, name: "East Gate" },
    west_end: { lat: 28.6692, lng: 77.089, name: "West End" },
  }), []);

  const stationKeys = useMemo(() => Object.keys(stations), [stations]);

  const handleCalculate = () => {
    if (!from || !to) {
      alert("Please select both starting point and destination.");
      return;
    }

    const baseFare = 50;
    const farePerStop = 15;
    const stops = Math.abs(stationKeys.indexOf(from) - stationKeys.indexOf(to));
    const totalFare = (baseFare + farePerStop * stops) * Number(passengers);

    setFare(totalFare.toFixed(2));
    setRouteDetails(`${stations[from].name} to ${stations[to].name}`);

    onRouteSelect({
      from: stations[from],
      to: stations[to],
    });
  };

  const handlePayment = () => setShowModal(true);

  return (
    <section
      className="w-[80vw] mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl"
      aria-label="Journey planning section"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Plan Your Journey
      </h2>

      {/* From - To Selection */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-left">
          <label htmlFor="from" className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
            From
          </label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
            aria-label="Select starting location"
          >
            {stationKeys.map((key) => (
              <option key={key} value={key}>
                {stations[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-left">
          <label htmlFor="to" className="block mb-2 font-medium text-gray-600 dark:text-gray-300">
            To
          </label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
            aria-label="Select destination"
          >
            {stationKeys.map((key) => (
              <option key={key} value={key}>
                {stations[key].name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Passenger + Calculate */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div className="flex-1 text-left">
          <label
            htmlFor="passengers"
            className="block mb-2 font-medium text-gray-600 dark:text-gray-300"
          >
            Passengers
          </label>
          <select
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800"
            aria-label="Select number of passengers"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          aria-label="Calculate fare"
        >
          Calculate Fare <i className="fas fa-calculator ml-2"></i>
        </button>
      </div>

      {/* Fare Result */}
      {fare && (
        <div className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Your Fare
              </h3>
              <p className="text-gray-500 dark:text-gray-400">{routeDetails}</p>
            </div>
            <div className="text-2xl font-bold text-green-600">₹{fare}</div>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
            aria-label="Proceed to payment"
          >
            Pay Now <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      )}

      {/* Payment Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-title"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
            <div className="text-green-500 text-5xl mb-3" aria-hidden="true">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3
              id="payment-title"
              className="text-xl font-bold mb-2 text-gray-800 dark:text-white"
            >
              Payment Successful!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your transaction has been completed successfully. Your tickets
              have been sent to your email.
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              aria-label="Close payment confirmation"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
