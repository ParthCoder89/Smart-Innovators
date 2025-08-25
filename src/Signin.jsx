import React, { useState } from "react";
import BlackRed from "./assets/blackred.jpg"; // Your background image
import { FaUserCircle } from "react-icons/fa";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = (e) => {
        e.preventDefault();
        // You can handle sign-in logic here
        alert(`Email: ${email}\nPassword: ${password}`);
    };

    return (
        <section id="signin">

            <div className="relative w-screen min-h-screen">
                {/* Background Image */}
                <div
                    className="fixed inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${BlackRed})` }}
                />
                {/* Dark Overlay */}
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />

                {/* Sign In Form */}
                <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
                    <div className="bg-[#1e1e1e] bg-opacity-90 p-10 rounded-2xl shadow-xl w-full max-w-md">
                        <div className="flex flex-col items-center mb-6">
                            <FaUserCircle className="text-6xl text-yellow-500 mb-4" />
                            <h2 className="text-3xl font-bold text-white">Sign In</h2>
                        </div>

                        <form onSubmit={handleSignIn} className="flex flex-col gap-5">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                required
                            />

                            <button
                                type="submit"
                                className="bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
