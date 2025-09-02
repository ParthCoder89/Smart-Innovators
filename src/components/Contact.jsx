import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <h2
        className="text-4xl font-bold text-center mt-10 mb-10"
        data-aos="zoom-out"
      >
        Contact Us 📩
      </h2>
      <p
        className="text-center max-w-2xl mx-5 md:mx-auto mb-10"
        data-aos="zoom-out"
      >
        Feel free to reach out to us for any queries, suggestions, or collaboration opportunities regarding our project.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-5 md:mx-auto">
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          data-aos="fade-right"
        >
          <h3 className="text-2xl font-semibold mb-12 text-center text-gray-800 dark:text-gray-200">
            Our Info
          </h3>
          <p className="mb-4 text-center text-[10px] md:text-[16px] text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> smartinnovators@example.com
          </p>
          <p className="text-center text-gray-700 dark:text-gray-300">
            <strong>Location:</strong> Invertis University Bareilly, Uttar Pradesh, India
          </p>
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          data-aos="zoom-out"
        >
          <h3 className="text-2xl font-semibold mb-12 text-center text-gray-800 dark:text-gray-200">
            Send a Message
          </h3>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-black dark:text-white dark:bg-gray-800"
              aria-label="Your name"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-black dark:text-white dark:bg-gray-800"
              aria-label="Your email"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-black dark:text-white dark:bg-gray-800"
              aria-label="Your message"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          data-aos="fade-left"
        >
          <h3 className="text-2xl font-semibold mb-12 text-center text-gray-800 dark:text-gray-200">
            Follow Us
          </h3>
          <ul className="space-y-3 flex flex-col items-center">
            <li>
              <a
                href="https://github.com/ParthCoder89/Smart-Innovators"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/parth-vaish-46b51533a"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/SmartInnovators"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer className="text-center mt-10 md:mt-16 text-sm text-gray-600 dark:text-gray-400">
        <p>© 2025 Smart Innovators. All rights reserved.</p>
        <p>Disclaimer: This project is for educational and demonstration purposes only.</p>
      </footer>
    </div>
  );
}