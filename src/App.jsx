import React from 'react'
import Header from './components/Header'
import DarkBus from './assets/dark bus.jpg';
import BlackRed from './assets/blackred.jpg'
import Home from './Home';
import TrackBus from './components/Track';

const App = () => {
  return (
    <div className="relative w-screen min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${BlackRed})`, opacity: '1' }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black opacity-40 z-10" />

      {/* Navbar (always top) */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Page Content (scrollable) */}
      <div className="relative z-20">
        <Home />
        <TrackBus />
        <div className="h-[100vh]"></div> {/* scroll test ke liye */}
      </div>
    </div>
  )
}

export default App
