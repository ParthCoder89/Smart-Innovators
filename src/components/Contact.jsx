import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true, // animate only once
        });
        AOS.refresh(); // force refresh so visible elements animate on load
    }, []);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
            {/* Heading */}
            <h2 className="text-4xl font-bold text-center mt-10 mb-10" data-aos="zoom-out">
                Contact Us 📩
            </h2>
            <p className="text-center max-w-2xl mx-5 md:mx-auto mb-10" data-aos="zoom-out">
                Feel free to reach out to us for any queries, suggestions, or
                collaboration opportunities regarding our project.
            </p>

            {/* Main 3-part section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-5 md:mx-auto" >
                {/* Left: Email + Location */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow" data-aos="fade-right">
                    <h3 className="text-2xl font-semibold mb-12 text-center">Our Info</h3>
                    <p className="mb-4 text-center text-[10px] md:text-[16px]">
                        <strong>Email :</strong> smartinnovators@example.com
                    </p>
                    <p className="text-center">
                        <strong>Location :</strong> Invertis University Bareilly, Uttar Pradesh, India
                    </p>
                </div>

                {/* Middle: Contact Form */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow" data-aos="zoom-out">
                    <h3 className="text-2xl font-semibold mb-12 text-center">Send a Message</h3>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                        />
                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Send
                        </button>
                    </form>
                </div>

                {/* Right: Social Links */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow" data-aos="fade-left">
                    <h3 className="text-2xl font-semibold mb-12 text-center">Follow Us</h3>
                    <ul className="space-y-3 flex flex-col items-center">
                        <li>
                            <a
                                href="https://github.com/ParthCoder89/Smart-Innovators"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/parth-vaish-46b51533a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-blue-500 hover:underline"
                            >
                                Twitter
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <footer className="text-center mt-10 md:mt-16 text-sm text-gray-600 dark:text-gray-400">
                <p>© 2025 Smart Innovators. All rights reserved.</p>
                <p>Disclaimer: This project is for educational and demonstration purposes only.</p>
            </footer>
        </div>
    );
};

export default Contact;
