import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Member1 from "../assets/member1.jpg";
import Member2 from "../assets/member2.jpg";
import Member3 from "../assets/member3.jpg";
import Member4 from "../assets/member4.jpg";
import Member5 from "../assets/member5.jpg";
import Member6 from "../assets/member6.jpg";

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return (
    <section
      className="bg-gray-50 dark:bg-gray-900 px-6 pt-10"
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Heading */}
      <h1
        id="about-heading"
        className="text-4xl font-bold text-center mb-20 mt-14"
        data-aos="zoom-out"
      >
        About Us <span role="img" aria-label="team">👥</span>
      </h1>

      {/* Team Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <article
          className="border-2 border-red-500 p-6 rounded-2xl"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Smart Innovators
          </h2>
          <p className="text-gray-700 dark:text-gray-300 px-6 text-justify">
            We are Smart Innovators, a team passionate about solving real-world
            problems using technology. Our project focuses on providing smarter
            transport solutions for commuters.
          </p>
        </article>

        <article
          className="border-2 border-red-500 p-6 rounded-2xl"
          data-aos="fade-left"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Our Project
          </h2>
          <p className="text-gray-700 dark:text-gray-300 px-6 text-justify">
            This project helps users track buses, book seats, and ensures a
            smarter commuting experience with real-time updates.
          </p>
        </article>
      </div>

      {/* Team Members */}
      <div className="flex flex-col" data-aos="zoom-out">
        {[
          {
            img: Member1,
            name: "Yash Sharma",
            role: "IoT Developer",
            github: "https://github.com/yashsharma0525/YASH",
            linkedin: "http://www.linkedin.com/in/yash-sharma-126b3b2a0",
            email: "yashtech0525@gmail.com",
          },
          {
            img: Member2,
            name: "Parth Vaish",
            role: "Project Manager & Frontend Developer",
            github: "https://github.com/ParthCoder89",
            linkedin:
              "https://www.linkedin.com/in/parth-vaish-46b51533a",
            email: "parthgupta5041@gmail.com",
          },
          {
            img: Member3,
            name: "Srashti Rastogi",
            role: "Frontend Developer & Model Maker",
            github: "https://github.com/SrashtiCoder19",
            linkedin:
              "https://www.linkedin.com/in/srashti-rastogi-701350308",
            email: "vedkarastogi@gmail.com",
          },
          {
            img: Member4,
            name: "Manthan Yadav",
            role: "Backend Developer",
            github: "https://github.com/Manthanyadav",
            linkedin: "https://linkedin.com/",
            email: "Manthany99@gmail.com",
          },
          {
            img: Member5,
            name: "Alok Verma",
            role: "Backed and Database Developer",
            github: "https://github.com/Alokzhan",
            linkedin:
              "https://www.linkedin.com/in/alok-verma-539833350",
            email: "alokji814@gmail.com",
          },
          {
            img: Member6,
            name: "Shivam Kumar",
            role: "AI Developer & Adviser",
            github: "https://github.com/codewithshiva",
            linkedin: "https://www.linkedin.com/in/shivam-kumar",
            email: "kumarshivam16338@gmail.com",
          },
        ].map((member, idx) => (
          <article
            key={idx}
            className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mb-10"
            data-aos="zoom-out"
          >
            {/* Left: Photo */}
            <figure className="flex justify-center">
              <img
                src={member.img}
                alt={`Team member ${member.name}`}
                className="rounded-full w-32 h-32 object-cover"
                loading="lazy"
              />
              <figcaption className="sr-only">{member.name}</figcaption>
            </figure>

            {/* Center: Name + social links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="mt-1">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  aria-label={`${member.name}'s GitHub`}
                >
                  GitHub
                </a>{" "}
                |{" "}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  LinkedIn
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${member.email}`}
                  className="hover:underline text-gray-700 dark:text-gray-300"
                >
                  {member.email}
                </a>
              </p>
            </div>

            {/* Right: Role */}
            <div className="text-center md:text-right md:mr-20">
              <p className="font-semibold">{`Role in Project: ${member.role}`}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
