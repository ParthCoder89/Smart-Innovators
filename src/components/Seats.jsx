import React, { useState, useEffect } from "react";
import SeatsJpg from "../assets/Seats.jpg";
import { realtimeDb } from "../lib/firebase";
import { ref, onValue } from "firebase/database";

export default function SeatDetails() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [occupiedSum, setOccupiedSum] = useState(0);

  useEffect(() => {
    const busesRef = ref(realtimeDb, "/buses");
    onValue(busesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busList = Object.keys(data).map((key) => ({
          id: key,
          seats: data[key].seats.map((occupied, i) => ({ number: i + 1, occupied })),
        }));
        setBuses(busList);
        setSelectedBus(busList[0] || null);
      }
    });
  }, []);

  useEffect(() => {
    if (buses.length) {
      const total = buses.reduce((sum, bus) => sum + bus.seats.filter((s) => s.occupied).length, 0);
      setOccupiedSum(total);
    }
  }, [buses]);

  const handleBusSelect = (e) => {
    setSelectedBus(buses.find((b) => b.id === e.target.value));
  };

  if (!selectedBus) return <p>Loading...</p>;

  const occupiedSeats = selectedBus.seats.filter((s) => s.occupied).length;
  const availableSeats = selectedBus.seats.length - occupiedSeats;

  return (
    <div id="seats" className="min-h-screen px-6 pt-10 pb-10 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white" data-aos="zoom-out">
        Seat Details
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full" data-aos="zoom-out">
          <label htmlFor="bus-select" className="text-xl block mb-4 text-gray-800 dark:text-gray-200 font-semibold">
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
            <img src={SeatsJpg} alt="Bus seat layout" className="mx-auto w-72 rounded-2xl" />
          </div>
          <div className="mt-16 text-center">
            <button
              onClick={() => alert("Booking coming soon!")}
              className="py-4 px-8 md:px-3 bg-orange-500 rounded-lg text-[11.5px] text-white font-bold hover:bg-orange-400"
              aria-label="Book your seat"
            >
              Book Your Seat
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full" data-aos="zoom-out">
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full" data-aos="zoom-out">
          <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
            Seats Details
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-4">
            <strong>Occupied:</strong> {occupiedSeats} / {selectedBus.seats.length}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 ml-4">
            <strong>Available:</strong> {availableSeats} / {selectedBus.seats.length}
          </p>
          <p className="text-lg text-blue-400 font-semibold ml-4">
            <strong>Total Occupied (All Buses):</strong> {occupiedSum}
          </p>
        </div>
      </div>
    </div>
  );
}