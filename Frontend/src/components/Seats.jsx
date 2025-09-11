import React, { useState, useEffect } from "react";
import SeatsJpg from "../assets/Seats.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { BASE_URL } from "../config";

export default function SeatDetails() {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 500, once: false });

    fetch(`${BASE_URL}/api/busdata`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueBuses = [...new Set(data.map((d) => d.busNumber))];
        const latest = {};
        data.forEach((d) => {
          if (
            !latest[d.busNumber] ||
            d.timestamp > latest[d.busNumber].timestamp
          ) {
            latest[d.busNumber] = d;
          }
        });
        setBuses(uniqueBuses.map((busNumber) => latest[busNumber]));
        if (uniqueBuses.length > 0) {
          setSelectedBus(latest[uniqueBuses[0]]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedBus) {
      const totalSeats = 50;
      const seats = [];

      for (let i = 1; i <= totalSeats; i++) {
        const seatKey = `seat${i}`;
        const status = selectedBus.seatStatus[seatKey] || "empty"; // agar backend se na aaye to empty maan lo
        seats.push(
          <div
            key={i}
            className={`w-5 h-5 rounded-full ${
              status === "occupied" ? "bg-red-500" : "bg-green-500"
            }`}
          ></div>
        );
      }
      setSeatLayout(seats);
    }
  }, [selectedBus]);

  const totalSeats = 50;
  const occupied = selectedBus
    ? Object.values(selectedBus.seatStatus).filter((s) => s === "occupied")
        .length
    : 0;
  const available = totalSeats - occupied;

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
        {/* Select Bus */}
        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          <label className="text-xl block mb-4 text-gray-800 dark:text-gray-200 font-semibold">
            Select Bus:
          </label>
          <select
            onChange={(e) =>
              setSelectedBus(
                buses.find((bus) => bus.busNumber === e.target.value)
              )
            }
            className="p-2 rounded w-full text-black border-2 border-red-500"
            value={selectedBus?.busNumber || ""}
          >
            {buses.map((bus) => (
              <option key={bus.busNumber} value={bus.busNumber}>
                {bus.busNumber}
              </option>
            ))}
          </select>

          <div className="mt-10">
            <img
              src={SeatsJpg}
              alt={`Seat layout diagram for ${selectedBus?.busNumber}`}
              className="mx-auto w-72 rounded-2xl"
              loading="lazy"
            />
          </div>
          <div className="mt-16 text-center">
            <button
              type="button"
              className="py-4 px-8 md:px-3 bg-orange-500 rounded-lg text-[11.5px] text-white font-bold hover:bg-orange-400"
            >
              Book Your Seat
            </button>
          </div>
        </article>

        {/* Seat Layout */}
        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
            Seat Layout
          </h3>
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {seatLayout}
          </div>
        </article>

        {/* Seat Info */}
        <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
            Seats Details
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-4">
            <strong>Occupied:</strong> {occupied} / {totalSeats}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 ml-4">
            <strong>Available:</strong> {available} / {totalSeats}
          </p>
        </article>
      </div>
    </section>
  );
}
