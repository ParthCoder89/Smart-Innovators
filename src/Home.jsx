import React from 'react'
import GoogleMap from './assets/google map 2.jpg'

const Home = () => {
    return (
        <section id="home" className="flex justify-between items-center px-10 h-screen text-white">
            {/* Left Content */}
            <div className="w-1/2 space-y-6 ml-[3vw]" style={{textShadow: '3px 3px 4px red'}}>
                <h1 className="text-4xl font-bold">
                    Smart Bus Tracking & Seat Occupancy System
                </h1>
                <p className="text-lg text-gray-200">
                    Track your bus in real-time, check available seats, and save time with
                    Smart Innovators’ smart transport solution.
                </p>
                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-500" style={{textShadow: '1px 2px 2px yellow'}}>
                    Start Tracking
                </button>
            </div>

            {/* Right Content (Image/Illustration placeholder) */}
            <div className="w-1/2 flex justify-center google-map-image-div">
                <img
                    src={GoogleMap}
                    alt="GoodleMap photo"
                    className="w-56 rounded-xl mt-10 ml-[10vw]"
                />
            </div>
        </section>
    )
}

export default Home
