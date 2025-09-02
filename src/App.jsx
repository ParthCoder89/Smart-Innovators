import React, { useState, useEffect } from "react";
import Navbar from "./components/Header";
import Home from "./components/Home";
import TrackBus from "./components/Track";
import SeatDetails from "./components/Seats";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize AOS once for the entire app
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  // Dark mode toggle effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowAuth={setShowAuth}
        user={user}
        setUser={setUser}
      />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="track">
          <TrackBus />
        </section>
        <section id="seats">
          <SeatDetails />
        </section>
        <section id="about">
          <AboutUs />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  );
}