import React, { useState } from "react";
import { db } from "../lib/firebase"; // Import Firebase Firestore
import { collection, addDoc } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError("Please fill out all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message: " + err.message);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 pt-10">
      <h2 className="text-4xl font-bold text-center mt-16 mb-20 text-gray-900 dark:text-white" data-aos="zoom-out">
        Contact Us
      </h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-right">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Get in Touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded mt-1 text-black dark:text-white dark:bg-gray-800"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded mt-1 text-black dark:text-white dark:bg-gray-800"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                id="message"
                className="w-full p-2 border rounded mt-1 text-black dark:text-white dark:bg-gray-800"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
              aria-label="Send message"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" data-aos="fade-left">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Contact Information
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Address:</strong> 123 Transit Way, City, Country
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Email:</strong> support@smarttransit.com
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Phone:</strong> +123-456-7890
          </p>
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153167!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727e3f1f2b5!2sFederation+Square!5e0!3m2!1sen!2sau!4v1533792524699"
              className="w-full h-64 rounded-lg"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              aria-hidden="false"
              title="Contact Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}