// import React from 'react'
// import Header from './components/Header'
// import DarkBus from './assets/dark bus.jpg';
// import BlackRed from './assets/blackred.jpg'
// import Home from './Home';
// import TrackBus from './components/Track';
// import SignIn from "./Signin";
// // import TrackBusResponsive from './components/TrackResponsive';

// const App = () => {
//   return (
//     <div className="relative w-screen min-h-screen">
//       {/* Background Image */}
//       <div
//         className="fixed inset-0 bg-cover bg-center z-0"
//         style={{ backgroundImage: `url(${BlackRed})`, opacity: '1' }}
//       />

//       {/* Dark Overlay */}
//       <div className="fixed inset-0 bg-black opacity-40 z-10" />

//       {/* Navbar (always top) */}
//       <div className="relative z-20">
//         <Header />
//         <SignIn />
        
//       </div>

//       {/* Page Content (scrollable) */}
//       <div className="relative z-20">
//         <Home />
//         <TrackBus />
//         {/* <TrackBusResponsive /> */}
//         {/* <div className="h-[100vh]"></div> scroll test ke liye */}
//       </div>
//     </div>
//   )
// }

// export default App



// App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Header";
import Home from "./components/Home";
import TrackBus from "./components/Track";
import SeatDetails from "./components/Seats";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

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
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
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
