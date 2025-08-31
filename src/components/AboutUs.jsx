import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Member1 from "../assets/member1.jpg"
import Member2 from "../assets/member2.jpg"
import Member3 from "../assets/member3.jpg"
import Member4 from "../assets/member4.jpg"
import Member5 from "../assets/member5.jpg"
import Member6 from "../assets/member6.jpg"

export default function AboutUs() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true, // animate only once
        });
        AOS.refresh(); // force refresh so visible elements animate on load
    }, []);
    return (
        <div className="bg-gray-50 dark:bg-gray-900  px-6 pt-10 ml-14 md:ml-0">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-center mb-20 mt-14" data-aos="zoom-out">
                About Us <span role="img" aria-label="team">👥</span>
            </h1>

            {/* Team Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Left div: Team name and description */}
                <div style={{ border: "2px solid red", padding: "15px", borderRadius: "20px" }} data-aos="fade-right">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Smart Innovators</h2>
                    <p className="text-gray-700 dark:text-gray-300 px-10">
                        {/* Team description text goes here */}
                        We are Smart Innovators, a team passionate about solving real-world
                        problems using technology. Our project focuses on …
                    </p>
                </div>

                {/* Right div: Placeholder for project details */}
                <div style={{ border: "2px solid red", padding: "15px", borderRadius: "20px" }} data-aos="fade-left">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Our Project</h2>
                    <p className="text-gray-700 dark:text-gray-300 px-10">
                        {/* Short project overview */}
                        This project helps users track buses, book seats, and ensures a
                        smarter commuting experience.
                    </p>
                </div>
            </div>

            {/* Team Members */}



            <div className="flex flex-col" data-aos="zoom-out">

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
                        <p>Email : yashtech0525@gmail.com</p>
                    </div>

                    {/* Right: Role */}
                    <div className="text-center md:text-right mr-0 md:mr-20">
                        <p className="font-semibold text-center">Role in Project : Iot Developer</p>
                    </div>
                </div>
            </div>


            {/* Team Member 02 */}

            {/* Member card */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
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
                    <h3 className="text-xl font-bold">Parth Vaish</h3>
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
                            href="https://www.linkedin.com/in/parth-vaish-46b51533a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            LinkedIn
                        </a>
                    </p>
                    <p>Email : parthgupta5041@gmail.com</p>
                </div>

                {/* Right: Role */}
                <div className="text-center md:text-right mr-0 md:mr-20">
                    <p className="font-semibold text-center">Role in Project : Project Manager & Frontend Developer</p>
                </div>
            </div>


            {/* Team Member 03 */}
            {/* Member card */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
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
                    <h3 className="text-xl font-bold">Srashti Rastogi</h3>
                    <p>
                        <a
                            href="https://github.com/SrashtiCoder19"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            GitHub
                        </a>{" "}
                        |{" "}
                        <a
                            href="https://www.linkedin.com/in/srashti-rastogi-701350308?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            LinkedIn
                        </a>
                    </p>
                    <p>Email: vedkarastogi@gmail.com</p>
                </div>

                {/* Right: Role */}
                <div className="text-center md:text-right mr-0 md:mr-20">
                    <p className="font-semibold text-center">Role in Project : Frontend Developer and Model Maker</p>
                </div>
            </div>

            {/* Team Member 04 */}

            {/* Member card */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
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
                    <h3 className="text-xl font-bold">Manthan Yadav</h3>
                    <p>
                        <a
                            href="https://github.com/Manthanyadav"
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
                    <p>Email: Manthany99@gmail.com</p>
                </div>

                {/* Right: Role */}
                <div className="text-center md:text-right mr-0 md:mr-20">
                    <p className="font-semibold text-center">Role in Project : Backend Developer</p>
                </div>
            </div>


            {/* Team Member 05 */}

            {/* Member card */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
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
                    <h3 className="text-xl font-bold">Alok Verma</h3>
                    <p>
                        <a
                            href="https://github.com/Alokzhan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            GitHub
                        </a>{" "}
                        |{" "}
                        <a
                            href="https://www.linkedin.com/in/alok-verma-539833350?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            LinkedIn
                        </a>
                    </p>
                    <p>Email: alokji814@gmail.com</p>
                </div>

                {/* Right: Role */}
                <div className="text-center md:text-right mr-0 md:mr-20">
                    <p className="font-semibold text-center">Role in Project : DataBase Developer</p>
                </div>
            </div>

            {/* Team Member 06 */}

            {/* Member card */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
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
                    <h3 className="text-xl font-bold">Shivam Kumar</h3>
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
                    <p>Email: kumarshivam16338@gmail.com</p>
                </div>

                {/* Right: Role */}
                <div className="text-center md:text-right mr-0 md:mr-20">
                    <p className="font-semibold text-center">Role in Project : AI Developer and Adviser</p>
                </div>
            </div>
        </div>


    );
}
