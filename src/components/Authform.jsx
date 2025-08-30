import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Authform({ type, onClose, onAuthSuccess }) {
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normally you would call backend API here
        const userData = { email, mobile };
        onAuthSuccess(userData);
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
    }, []);


    return (
        <div className="fixed inset-0 flex justify-end z-50" data-aos="fade-left">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>

            {/* Sliding Panel */}
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-8 transform translate-x-0 transition-transform duration-300">

                <button
                    className="absolute top-4 right-4 text-4xl font-bold text-gray-600 hover:text-red-600"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mt-10 mb-6 text-center">
                    {type === "signin" ? "Sign In" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded mt-1 text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {type === "signup" && (
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Mobile Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded mt-1 text-black"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mt-1 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
                    >
                        {type === "signin" ? "Sign In" : "Sign Up"}
                    </button>
                    {/* <button className="fixed top-5 right-5">
                        *
                    </button> */}
                </form>
            </div>
        </div>
    );
}


