import React from 'react'

const Header = () => {
    return (
        <nav className="flex items-center justify-between bg-yellow-800 p-4 text-white fixed top-0 left-0 w-full z-50"> 
            {/* Left - Team Name */}
            <div className="text-2xl ml-4 font-bold">Smart Innovators</div>

            {/* Center - Menu */}
            <ul className="flex gap-14 font-bold">
                <li><a href="#home" className="hover:text-gray-200">Home</a></li>
                <li><a href="#track" className="hover:text-gray-200">Track Bus</a></li>
                <li><a href="#seats" className="hover:text-gray-200">Seat Status</a></li>
                <li><a href="#about" className="hover:text-gray-200">About</a></li>
            </ul>

            {/* Right - Google Login Button */}
            <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 mr-3">
                Login with Google
            </button>
        </nav>

    )
}

export default Header