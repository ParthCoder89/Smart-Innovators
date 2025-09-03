import React, { useState, useEffect } from "react";
import SeatsJpg from "../assets/Seats.jpg";

export default function SeatDetails() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  // Dummy bus data with seat information
  const dummyBuses = [
    {
      id: "B001",
      seats: [
        { number: 1, occupied: true },
        { number: 2, occupied: false },
        { number: 3, occupied: true },
        { number: 4, occupied: false },
        { number: 5, occupied: false },
      ],
    },
    {
      id: "B002",
      seats: [
        { number: 1, occupied: false },
        { number: 2, occupied: true },
        { number: 3, occupied: false },
        { number: 4, occupied: true },
        { number: 5, occupied: true },
      ],
    },
    {
      id: "B003",
      seats: [
        { number: 1, occupied: true },
        { number: 2, occupied: true },
        { number: 3, occupied: false },
        { number: 4, occupied: false },
        { number: 5, occupied: true },
      ],
    },
  ];

  // Set dummy data on component mount
  useEffect(() => {
    setBuses(dummyBuses);
    setSelectedBus(dummyBuses[0]); // Default to first bus
  }, []);

  const handleBusSelect = (e) => {
    setSelectedBus(buses.find(b => b.id === e.target.value));
  };

  if (!selectedBus) return <p>Loading...</p>;

  const occupiedSeats = selectedBus.seats.filter(seat => seat.occupied).length;
  const availableSeats = selectedBus.seats.length - occupiedSeats;

  return (
    <div
      id="seats"
      className="min-h-screen px-6 pt-10 pb-10 bg-gray-50 dark:bg-gray-900"
    >
      <h2
        className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white"
        data-aos="zoom-out"
      >
        Seat Details
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
          data-aos="zoom-out"
        >
          <label
            htmlFor="bus-select"
            className="text-xl block mb-4 text-gray-800 dark:text-gray-200 font-semibold"
          >
            Select Bus:
          </label>
          <select
            id="bus-select"
            onChange={handleBusSelect}
            className="p-2 rounded w-full text-black dark:text-white dark:bg-gray-800"
            style={{ border: "2px solid red" }}
            value={selectedBus?.id || ""}
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
              alt="Bus seat layout"
              className="mx-auto w-72 rounded-2xl"
            />
          </div>
          <div className="mt-16 text-center">
            <button
              onClick={() => alert("Booking functionality coming soon!")}
              className="py-4 px-8 md:px-3 bg-orange-500 rounded-lg text-[11.5px] text-white text-center font-bold hover:bg-orange-400"
              aria-label="Book your seat"
            >
              Book Your Seat
            </button>
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full"
          data-aos="zoom-out"
        >
          <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
            Seat Layout
          </h3>
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {selectedBus.seats.map((seat) => (
              <div
                key={seat.number}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  seat.occupied ? "bg-red-500" : "bg-green-500"
                } text-white`}
              >
                {seat.number}
              </div>
            ))}
          </div>
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mr-0 md:mr-10 w-full"
          data-aos="zoom-out"
        >
          <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
            Seats Details
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-4">
            <strong>Occupied:</strong> {occupiedSeats} / {selectedBus.seats.length}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 ml-4">
            <strong>Available:</strong> {availableSeats} / {selectedBus.seats.length}
          </p>
        </div>
      </div>
    </div>
  );
}