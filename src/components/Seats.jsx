import React, { useState, useEffect } from "react";
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

    const availableSeats = selectedBus.seats - selectedBus.occupied;

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false,  
        });
    }, []);

    return (
        <div
            id="seats"
            className="min-h-screen px-6 pt-10 pb-10 bg-gray-50 dark:bg-gray-900"
        >
            <h2 className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white" data-aos="zoom-out">
                Seat Details
            </h2>

            <div className="grid md:grid-cols-3 gap-16" data-aos="zoom-out">
                {/* First Column */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg ml-10">
                    <label className="text-xl block mb-4 text-gray-800 dark:text-gray-200 font-semibold">
                        Select Bus:
                    </label>
                    <select
                        onChange={(e) =>
                            setSelectedBus(
                                buses.find((bus) => bus.id === e.target.value) || buses[0]
                            )
                        }
                        className="p-2 rounded w-full text-black"
                        style={{ border: "2px solid red" }}
                        value={selectedBus.id}
                    >
                        {buses.map((bus) => (
                            <option key={bus.id} value={bus.id}>
                                {bus.id}
                            </option>
                        ))}
                    </select>

                    <div className="mt-20">
                        <img
                            src={SeatsJpg}
                            alt="Bus Seat Layout"
                            className="mx-auto w-72 rounded-2xl"
                        />
                    </div>
                </div>

                {/* Second Column */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" data-aos="zoom-out">
                    <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
                        Seat Layout
                    </h3>
                    <div className="grid grid-cols-5 gap-3 justify-items-center">
                        {Array.from({ length: selectedBus.seats }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${index < selectedBus.occupied
                                        ? "bg-red-500 text-white"
                                        : "bg-green-500 text-white"
                                    }`}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Third Column */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mr-10" data-aos="zoom-out">
                    <h3 className="text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200 text-center">
                        Seats Details
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 ml-4">
                        <strong>Occupied :</strong> {selectedBus.occupied} /{" "}
                        {selectedBus.seats}
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 ml-4">
                        <strong>Available :</strong> {availableSeats} /{" "}
                        {selectedBus.seats}
                    </p>
                </div>
            </div>
        </div>
    );
}
