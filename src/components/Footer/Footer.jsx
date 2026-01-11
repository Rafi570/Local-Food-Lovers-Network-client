import React from "react";
import logo from "../../assets/pngtree-i-m-just-here-for-the-food-funny-fast-food-lover-png-image_2310810.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#FFF3E0] dark:bg-gray-950 mt-10 text-gray-700 dark:text-gray-300 pt-10 pb-6 px-6 md:px-20 transition-colors duration-300">
      {/* Main content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Food Lover Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#FF9800]"
            />
            <h2 className="text-2xl font-bold text-[#FF9800]">Food Lover</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Discover, review, and share your favorite meals!  
            Food Lover connects you with top-rated dishes and hidden gems near you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#FF9800] transition-colors">Home</a></li>
            <li><a href="/all-reviews" className="hover:text-[#FF9800] transition-colors">All Reviews</a></li>
            <li><a href="/#" className="hover:text-[#FF9800] transition-colors">Contact</a></li>
            <li><a href="/#" className="hover:text-[#FF9800] transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">📍 <span className="dark:text-gray-400">Dhaka, Bangladesh</span></li>
            <li className="flex items-center gap-2">📞 <span className="dark:text-gray-400">+880 1234 567 890</span></li>
            <li className="flex items-center gap-2">✉️ <span className="dark:text-gray-400">support@foodlover.com</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Stay Updated</h3>
          <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
            Subscribe to get tasty news and updates every week!
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-[#FF9800] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#FF9800] text-white px-4 py-2 rounded-r-md hover:bg-[#e68900] transition-all font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-300 dark:border-gray-800 mt-10 pt-4 text-center text-sm text-gray-600 dark:text-gray-500">
        © {new Date().getFullYear()} <span className="text-[#FF9800] font-semibold">Food Lover</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;