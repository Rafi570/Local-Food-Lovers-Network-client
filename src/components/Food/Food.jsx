import React from "react";
import { MapPin, Star, User } from "lucide-react";
import { Link } from "react-router";

const Food = ({ food }) => {
  return (
    <div data-aos="fade-up"
    className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100">
      {/* Food Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" // dynamic photo
          alt={food.foodName}
          className="w-full h-56 object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#FF9800] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Popular
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Food Name */}
        <h2 className="text-xl font-bold text-gray-900">{food.foodName} 🍔</h2>

        {/* Restaurant Info */}
        <div className="text-gray-700 text-sm">
          <p className="font-medium">{food.restaurantName}</p>
          <div className="flex items-center text-gray-500 text-xs mt-1">
            <MapPin size={14} className="mr-1 text-[#FF9800]" />
            <span>{food.location}</span>
          </div>
        </div>

        {/* Reviewer Info */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-600 text-sm">
            <User size={16} className="mr-1 text-[#FF9800]" />
            <span>Reviewed by <strong>{food.reviewerName}</strong></span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[#FF9800]">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(food.rating) ? "#FF9800" : "none"}
                color="#FF9800"
              />
            ))}
            <span className="text-gray-700 text-xs ml-1">({food.rating})</span>
          </div>
        </div>

        {/* Button */}
        <Link to={`/details-review/${food._id}`}>
          <button className="w-full mt-3 bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Food;
