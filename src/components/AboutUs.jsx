import React from "react";
import Member1 from "../assets/member1.jpg";
import Member2 from "../assets/member2.jpg";
import Member3 from "../assets/member3.jpg";
import Member4 from "../assets/member4.jpg";
import Member5 from "../assets/member5.jpg";
import Member6 from "../assets/member6.jpg";

export default function AboutUs() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-6 pt-10">
      <h1
        className="text-4xl font-bold text-center mb-20 mt-14 text-gray-900 dark:text-white"
        data-aos="zoom-out"
      >
        About Us <span role="img" aria-label="team">👥</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div
          style={{ border: "2px solid red", padding: "15px", borderRadius: "20px" }}
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
            Smart Innovators
          </h2>
          <p className="text-gray-700 dark:text-gray-300 px-10">
            We are Smart Innovators, a team passionate about solving real-world problems using technology. Our project focuses on revolutionizing public transportation with real-time bus tracking and seat occupancy solutions to make commuting smarter and more efficient.
          </p>
        </div>
        <div
          style={{ border: "2px solid red", padding: "15px", borderRadius: "20px" }}
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
            Our Project
          </h2>
          <p className="text-gray-700 dark:text-gray-300 px-10">
            This project helps users track buses, book seats, and ensures a smarter commuting experience through real-time updates and seamless integration.
          </p>
        </div>
      </div>
      <div className="flex flex-col" data-aos="zoom-out">
        {/* Team Member 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mt-10 mb-10">
          <div className="flex justify-center">
            <img
              src={Member1}
              alt="Yash Sharma"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Yash Sharma</h3>
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
            <p className="text-gray-700 dark:text-gray-300">Email: yashtech0525@gmail.com</p>
          </div>
          <div className="text-center md:text-right mr-0 md:mr-20">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Role in Project: IoT Developer</p>
          </div>
        </div>
        {/* Team Member 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
          <div className="flex justify-center">
            <img
              src={Member2}
              alt="Parth Vaish"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Parth Vaish</h3>
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
                href="https://www.linkedin.com/in/parth-vaish-46b51533a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">Email: parthgupta5041@gmail.com</p>
          </div>
          <div className="text-center md:text-right mr-0 md:mr-20">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Role in Project: Project Manager & Frontend Developer</p>
          </div>
        </div>
        {/* Team Member 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
          <div className="flex justify-center">
            <img
              src={Member3}
              alt="Srashti Rastogi"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Srashti Rastogi</h3>
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
                href="https://www.linkedin.com/in/srashti-rastogi-701350308"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">Email: vedkarastogi@gmail.com</p>
          </div>
          <div className="text-center md:text-right mr-0 md:mr-20">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Role in Project: Frontend Developer and Model Maker</p>
          </div>
        </div>
        {/* Team Member 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
          <div className="flex justify-center">
            <img
              src={Member4}
              alt="Manthan Yadav"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Manthan Yadav</h3>
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
                href="https://www.linkedin.com/in/manthan-yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">Email: Manthany99@gmail.com</p>
          </div>
          <div className="text-center md:text-right mr-0 md:mr-20">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Role in Project: Backend Developer</p>
          </div>
        </div>
        {/* Team Member 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
          <div className="flex justify-center">
            <img
              src={Member5}
              alt="Alok Verma"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Alok Verma</h3>
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
                href="https://www.linkedin.com/in/alok-verma-539833350"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">Email: alokji814@gmail.com</p>
          </div>
          <div className="text-center md:text-right mr-0 md:mr-20">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Role in Project: Database Developer</p>
          </div>
        </div>
        {/* Team Member 6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10" data-aos="zoom-out">
          <div className="flex justify-center">
            <img
              src={Member6}
              alt="Shivam Kumar"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Shivam Kumar</h3>
            <p>
              <a
                href="https://github.com/codewithshiva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/shivam-kumar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </p>
            <p className="text-gray-700 dark:text-gray-300">Email: kumarshivam16338@gmail.com</p>
          </div>
          <div className="text-center md:text-right mr-0 md:mr-20">
            <p className="font-semibold text-gray-800 dark:text-gray-200">Role in Project: AI Developer and Adviser</p>
          </div>
        </div>
      </div>
    </div>
  );
}