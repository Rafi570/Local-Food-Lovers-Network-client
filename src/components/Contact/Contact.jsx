import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../../assets/pngtree-i-m-just-here-for-the-food-funny-fast-food-lover-png-image_2310810.jpg";

const Contact = () => {
  return (
    <section className="bg-[#FFF8F0] min-h-screen py-16 px-6 md:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#FF9800] mb-3">
          Get in Touch
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have a question, feedback, or just want to say hi —  
          the Local Food Lovers Network team is always here for you.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              Local Food Lovers Network
            </h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Join our mission to celebrate local food, honest reviews, and passionate food lovers.  
            We’re building a friendly community where everyone can share their best bites and hidden gems.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#FF9800]" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#FF9800]" /> +880 1234 567 890
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF9800]" /> support@foodlovers.com
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="bg-[#FF9800] text-white p-2 rounded-full hover:bg-[#e68900] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-[#FF9800] text-white p-2 rounded-full hover:bg-[#e68900] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-[#FF9800] text-white p-2 rounded-full hover:bg-[#e68900] transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h3>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF9800] text-white font-semibold py-3 rounded-md hover:bg-[#e68900] transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
