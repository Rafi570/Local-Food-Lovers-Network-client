import React from "react";
import { FaUtensils, FaHeart, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="pt-24 px-4 md:px-12  min-h-screen">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-[#FF9800] mb-4">
          About Food Lover
        </h1>
        <p className="text-gray-600 text-lg">
          We are here for people who truly love food 🍔🍕  
          Discover, review, and share your favorite food experiences.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="text-[#FF9800] text-4xl mb-4">
            <FaUtensils />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Discover Food
          </h3>
          <p className="text-gray-600">
            Explore reviews of delicious foods from different places and
            find your next favorite meal.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="text-[#FF9800] text-4xl mb-4">
            <FaHeart />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Save Favorites
          </h3>
          <p className="text-gray-600">
            Love a food? Add it to your favorites and come back anytime.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
          <div className="text-[#FF9800] text-4xl mb-4">
            <FaUsers />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Community Reviews
          </h3>
          <p className="text-gray-600">
            Share your food experience and help others choose the best.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-700 text-lg">
          Made with ❤️ for food lovers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
