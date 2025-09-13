// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Contact = () => {
//     useEffect(() => {
//         AOS.init({
//             duration: 800,
//             once: true, // animate only once for performance
//         });
//     }, []);

//     return (
//         <section
//             id="contact"
//             className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6"
//         >
//             {/* Heading */}
//             <h1
//                 className="text-4xl font-bold text-center mt-10 mb-10"
//                 data-aos="zoom-out"
//             >
//                 Contact Us 📩
//             </h1>
//             <p
//                 className="text-center max-w-2xl mx-5 md:mx-auto mb-10"
//                 data-aos="zoom-out"
//             >
//                 Feel free to reach out for any queries, suggestions, or collaboration
//                 opportunities regarding our project.
//             </p>

//             {/* Main 3-part section */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-5 md:mx-auto">
//                 {/* Left: Email + Location */}
//                 <address
//                     className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow not-italic"
//                     data-aos="fade-right"
//                 >
//                     <h2 className="text-2xl font-semibold mb-8 text-center">Our Info</h2>
//                     <p className="mb-4 text-center text-sm md:text-base">
//                         <strong>Email:</strong>{" "}
//                         <a
//                             href="mailto:smartinnovators@example.com"
//                             className="text-blue-500 hover:underline"
//                         >
//                             smartinnovators@example.com
//                         </a>
//                     </p>
//                     <p className="text-center">
//                         <strong>Location:</strong> Invertis University Bareilly, Uttar
//                         Pradesh, India
//                     </p>
//                 </address>

//                 {/* Middle: Contact Form */}
//                 <div
//                     className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
//                     data-aos="zoom-out"
//                 >
//                     <h2 className="text-2xl font-semibold mb-8 text-center">
//                         Send a Message
//                     </h2>
//                     <form className="space-y-4" aria-label="Contact form">
//                         <input
//                             type="text"
//                             name="name"
//                             aria-label="Your Name"
//                             placeholder="Your Name"
//                             required
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             aria-label="Your Email"
//                             placeholder="Your Email"
//                             required
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
//                         />
//                         <textarea
//                             name="message"
//                             rows="4"
//                             aria-label="Your Message"
//                             placeholder="Your Message"
//                             required
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
//                         ></textarea>
//                         <button
//                             type="submit"
//                             className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                         >
//                             Send
//                         </button>
//                     </form>
//                 </div>

//                 {/* Right: Social Links */}
//                 <nav
//                     className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
//                     data-aos="fade-left"
//                     aria-label="Social media links"
//                 >
//                     <h2 className="text-2xl font-semibold mb-8 text-center">
//                         Follow Us
//                     </h2>
//                     <ul className="space-y-3 flex flex-col items-center">
//                         <li>
//                             <a
//                                 href="https://github.com/ParthCoder89/Smart-Innovators"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label="GitHub profile"
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 GitHub
//                             </a>
//                         </li>
//                         <li>
//                             <a
//                                 href="https://www.linkedin.com/in/parth-vaish-46b51533a"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label="LinkedIn profile"
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 LinkedIn
//                             </a>
//                         </li>
//                         <li>
//                             <a
//                                 href="#"
//                                 aria-label="Twitter profile"
//                                 className="text-blue-500 hover:underline"
//                             >
//                                 Twitter
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>

//             {/* Footer */}
//             <footer className="text-center mt-10 md:mt-16 text-sm text-gray-600 dark:text-gray-400">
//                 <p>© 2025 Smart Innovators. All rights reserved.</p>
//                 <p>
//                     Disclaimer: This project is for educational and demonstration purposes
//                     only.
//                 </p>
//             </footer>
//         </section>
//     );
// };

// export default Contact;



import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser"; // ✅ EmailJS import

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // ✅ Form submit handler
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_52e7dxy",   // ⚡ yaha apna service ID daalo
        "template_tg8swyl",  // ⚡ yaha apna template ID daalo
        form.current,
        "w2L-A2wr3YT3Sbb0r"    // ⚡ yaha apna public key (user ID) daalo
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("✅ Message sent successfully!");
          form.current.reset(); // form clear karne ke liye
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6"
    >
      {/* Heading */}
      <h1
        className="text-4xl font-bold text-center mt-10 mb-10"
        data-aos="zoom-out"
      >
        Contact Us 📩
      </h1>
      <p
        className="text-center max-w-2xl mx-5 md:mx-auto mb-10"
        data-aos="zoom-out"
      >
        Feel free to reach out for any queries, suggestions, or collaboration
        opportunities regarding our project.
      </p>

      {/* Main 3-part section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-5 md:mx-auto">
        {/* Left: Email + Location */}
        <address
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow not-italic"
          data-aos="fade-right"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Info</h2>
          <p className="mb-4 text-center text-sm md:text-base">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:smartinnovators@example.com"
              className="text-blue-500 hover:underline"
            >
              smartinnovators@example.com
            </a>
          </p>
          <p className="text-center">
            <strong>Location:</strong> Invertis University Bareilly, Uttar
            Pradesh, India
          </p>
        </address>

        {/* Middle: Contact Form */}
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          data-aos="zoom-out"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Send a Message
          </h2>
          {/* ✅ EmailJS form connected */}
          <form ref={form} onSubmit={sendEmail} className="space-y-4" aria-label="Contact form">
            <input
              type="text"
              name="user_name"
              aria-label="Your Name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
            <input
              type="email"
              name="user_email"
              aria-label="Your Email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
            <textarea
              name="message"
              rows="4"
              aria-label="Your Message"
              placeholder="Your Message"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Right: Social Links */}
        <nav
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
          data-aos="fade-left"
          aria-label="Social media links"
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">Follow Us</h2>
          <ul className="space-y-3 flex flex-col items-center">
            <li>
              <a
                href="https://github.com/ParthCoder89/Smart-Innovators"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/parth-vaish-46b51533a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Twitter profile"
                className="text-blue-500 hover:underline"
              >
                Twitter
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 md:mt-16 text-sm text-gray-600 dark:text-gray-400">
        <p>© 2025 Smart Innovators. All rights reserved.</p>
        <p>
          Disclaimer: This project is for educational and demonstration purposes
          only.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
