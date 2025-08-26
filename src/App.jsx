// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Header";
// import Home from "./components/Home";
// import TrackBus from "./components/Track";
// import SeatDetails from "./components/Seats";

// export default function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   // Dark mode toggle effect
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
//       <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
//       <main>
//         <section id="home">
//           <Home />
//         </section>
//         <section id="track">
//           <TrackBus />
//         </section>
//         <section id="seats">
//           <SeatDetails />
//         </section>
//       </main>
//     </div>
//   );
// }


// App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Header";
import Home from "./components/Home";
import TrackBus from "./components/Track";
import SeatDetails from "./components/Seats";
import AuthForm from "./components/Authform"; // 👈 import the auth form

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false); // 👈 auth modal toggle
  const [user, setUser] = useState(null); // 👈 user state (email after login/signup)

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
      {/* Navbar (passing auth props also) */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowAuth={setShowAuth}
        user={user}
      />

      {/* AuthForm overlay, opens only when showAuth = true */}
      {showAuth && (
        <AuthForm setShowAuth={setShowAuth} setUser={setUser} />
      )}

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
      </main>
    </div>
  );
}
