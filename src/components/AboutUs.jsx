import React from "react";
import Member1 from "../assets/member1.jpg"
import Member2 from "../assets/member2.jpg"
import Member3 from "../assets/member3.jpg"
import Member4 from "../assets/member4.jpg"
import Member5 from "../assets/member5.jpg"
import Member6 from "../assets/member6.jpg"

export default function AboutUs() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900  px-6 pt-10">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-center mb-20 mt-14">
                About Us <span role="img" aria-label="team">👥</span>
            </h1>

            {/* Team Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Left div: Team name and description */}
                <div style={{ border: "2px solid red", padding: "15px", borderRadius: "20px" }}>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Smart Innovators</h2>
                    <p className="text-gray-700 dark:text-gray-300 px-10">
                        {/* Team description text goes here */}
                        We are Smart Innovators, a team passionate about solving real-world
                        problems using technology. Our project focuses on …
                    </p>
                </div>

                {/* Right div: Placeholder for project details */}
                <div style={{ border: "2px solid red", padding: "15px", borderRadius: "20px" }}>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Our Project</h2>
                    <p className="text-gray-700 dark:text-gray-300 px-10">
                        {/* Short project overview */}
                        This project helps users track buses, book seats, and ensures a
                        smarter commuting experience.
                    </p>
                </div>
            </div>

            {/* Team Members */}



            <div className="flex flex-col">

                {/* Team Member 01 */}

                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mt-10 mb-10">
                    {/* Left: Photo */}
                    <div className="flex justify-center">
                        <img
                            src={Member1}
                            alt="Team member"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Center: Name + social links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">Yash Sharma</h3>
                        <p>
                            <a
                                href="https://github.com/yashsharma0525/YASH"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href="http://www.linkedin.com/in/yash-sharma-126b3b2a0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>Email: member@example.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-20">
                        <p className="font-medium">Role in Project: Developer</p>
                    </div>
                </div>
            </div>


            {/* Team Member 02 */}

                {/* Member card */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10">
                    {/* Left: Photo */}
                    <div className="flex justify-center">
                        <img
                            src={Member2}
                            alt="Team member"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Center: Name + social links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">Member Name</h3>
                        <p>
                            <a
                                href="https://github.com/ParthCoder89"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>Email: member@example.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-20">
                        <p className="font-medium">Role in Project: Developer</p>
                    </div>
                </div>


            {/* Team Member 03 */}
                {/* Member card */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10">
                    {/* Left: Photo */}
                    <div className="flex justify-center">
                        <img
                            src={Member3}
                            alt="Team member"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Center: Name + social links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">Member Name</h3>
                        <p>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>Email: member@example.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-20">
                        <p className="font-medium">Role in Project: Developer</p>
                    </div>
                </div>

            {/* Team Member 04 */}

                {/* Member card */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10">
                    {/* Left: Photo */}
                    <div className="flex justify-center">
                        <img
                            src={Member4}
                            alt="Team member"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Center: Name + social links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">Member Name</h3>
                        <p>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>Email: member@example.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-20">
                        <p className="font-medium">Role in Project: Developer</p>
                    </div>
                </div>


            {/* Team Member 05 */}

                {/* Member card */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10">
                    {/* Left: Photo */}
                    <div className="flex justify-center">
                        <img
                            src={Member5}
                            alt="Team member"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Center: Name + social links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">Member Name</h3>
                        <p>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>Email: member@example.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-20">
                        <p className="font-medium">Role in Project: Developer</p>
                    </div>
                </div>

                {/* Repeat this block for each of the 6 members */}

            {/* Team Member 06 */}

                {/* Member card */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10">
                    {/* Left: Photo */}
                    <div className="flex justify-center">
                        <img
                            src={Member6}
                            alt="Team member"
                            className="rounded-full w-32 h-32 object-cover"
                        />
                    </div>

                    {/* Center: Name + social links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">Member Name</h3>
                        <p>
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p>Email: member@example.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-20">
                        <p className="font-medium">Role in Project: Developer</p>
                    </div>
                </div>

                {/* Repeat this block for each of the 6 members */}
            </div>


    );
}
