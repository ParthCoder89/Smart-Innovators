import React, { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Header";
import AuthForm from "./components/Authform";

// Lazy load heavy components for performance
const Home = lazy(() => import("./components/Home"));
const TrackBus = lazy(() => import("./components/Track"));
const SeatDetails = lazy(() => import("./components/Seats"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Set SEO meta dynamically
    document.title = "Smart Transit System | Track & Book Bus Seats";
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Track your bus in real-time, check seat availability, and book tickets easily with Smart Transit System."
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content =
        "Track your bus in real-time, check seat availability, and book tickets easily with Smart Transit System.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowAuth={setShowAuth}
        user={user}
      />

      {/* Auth Modal */}
      {showAuth && <AuthForm setShowAuth={setShowAuth} setUser={setUser} />}

      {/* Suspense fallback for lazy-loaded components */}
      <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
        <main role="main">
          <section id="home" aria-label="Homepage">
            <Home />
          </section>
          <section id="track" aria-label="Track Bus">
            <TrackBus />
          </section>
          <section id="seats" aria-label="Seat Booking">
            <SeatDetails />
          </section>
          <section id="about" aria-label="About Us">
            <AboutUs />
          </section>
          <section id="contact" aria-label="Contact Us">
            <Contact />
          </section>
        </main>
      </Suspense>
    </div>
  );
}
