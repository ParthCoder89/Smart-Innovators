import React, { useState } from "react";

export default function JourneyPlanner() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [fare, setFare] = useState(null);
  const [routeDetails, setRouteDetails] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleCalculate = () => {
    if (!from || !to) {
      alert("Please select both starting point and destination.");
      return;
    }

    const baseFare = 50;
    const farePerStop = 15;

    const options = [
      "",
      "central_station",
      "north_terminal",
      "south_plaza",
      "east_gate",
      "west_end",
    ];

    const stops = Math.abs(options.indexOf(from) - options.indexOf(to));
    const totalFare = (baseFare + farePerStop * stops) * parseInt(passengers);

    setFare(totalFare.toFixed(2));

    const fromText = options.find((val) => val === from)?.replace("_", " ");
    const toText = options.find((val) => val === to)?.replace("_", " ");

    setRouteDetails(`${fromText} to ${toText}`);
  };

  const handlePayment = () => {
    setShowModal(true);
  };

  return (
    <div className="w-[80vw] mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Plan Your Journey
      </h2>

      {/* From and To fields in one row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-left">
          <label htmlFor="from" className="block mb-2 font-medium text-gray-600">
            From
          </label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Location</option>
            <option value="central_station">Central Station</option>
            <option value="north_terminal">North Terminal</option>
            <option value="south_plaza">South Plaza</option>
            <option value="east_gate">East Gate</option>
            <option value="west_end">West End</option>
          </select>
        </div>

        <div className="text-left">
          <label htmlFor="to" className="block mb-2 font-medium text-gray-600">
            To
          </label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Location</option>
            <option value="central_station">Central Station</option>
            <option value="north_terminal">North Terminal</option>
            <option value="south_plaza">South Plaza</option>
            <option value="east_gate">East Gate</option>
            <option value="west_end">West End</option>
          </select>
        </div>
      </div>

      {/* Passengers + Button */}
      <div className="flex items-end justify-between gap-6 mb-6">
        <div className="flex-1 text-left">
          <label
            htmlFor="passengers"
            className="block mb-2 font-medium text-gray-600"
          >
            Passengers
          </label>
          <select
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
        >
          Calculate Fare <i className="fas fa-calculator ml-2"></i>
        </button>
      </div>

      {/* Fare Result */}
      {fare && (
        <div className="bg-gray-100 p-5 rounded-lg mt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Your Fare</h3>
              <p className="text-gray-500">{routeDetails}</p>
            </div>
            <div className="text-2xl font-bold text-green-600">₹{fare}</div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
          >
            Pay Now <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      )}

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <div className="text-green-500 text-5xl mb-3">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your transaction has been completed successfully. Your tickets
              have been sent to your email.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
