import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-4">
        {/* Fun Image */}
        {/* <img
        src="https://images.unsplash.com/photo-1589308078052-5f9f6a2b9c17?auto=format&fit=crop&w=600&q=80"
        alt="404 Not Found"
        className="w-72 sm:w-96 mb-6 border-4 border-[#FF9800] rounded-xl shadow-lg"
      /> */}

        {/* Text */}
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 border-b-4 border-[#FF9800] pb-2">
          404
        </h1>
        <p className="text-lg sm:text-xl mb-6 text-center max-w-md">
          Oops! The page you’re looking for doesn’t exist. Maybe it wandered off
          like a lost snack 🍕
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="border-2 border-[#FF9800] text-[#FF9800] font-semibold px-6 py-3 rounded-full shadow hover:bg-[#FF9800] hover:text-white transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
