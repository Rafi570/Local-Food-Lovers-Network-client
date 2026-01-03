import React from "react";
import { MapPin, Star, User } from "lucide-react";
import { Link } from "react-router";

const Food = ({ food }) => {
  return (
    <div 
      data-aos="fade-up"
      className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group flex flex-col h-full"
    >
      {/* Food Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={food.photo}
          alt={food.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <span className="absolute top-3 left-3 bg-[#FF9800] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          Popular
        </span>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Top Info */}
        <div className="flex-grow space-y-3">
            {/* Food Name */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
            {food.foodName} 🍔
            </h2>

            {/* Restaurant Info */}
            <div className="space-y-1">
            <p className="font-medium text-gray-700 dark:text-gray-300 truncate">{food.restaurantName}</p>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                <MapPin size={14} className="mr-1 text-[#FF9800] shrink-0" />
                <span className="truncate">{food.location}</span>
            </div>
            </div>

            {/* Reviewer Info & Rating */}
            <div className="flex items-center justify-between mt-2 pt-3 border-t dark:border-gray-700">
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm overflow-hidden mr-2">
                <User size={16} className="mr-1 text-[#FF9800] shrink-0" />
                <span className="truncate">
                    By <strong className="text-gray-800 dark:text-gray-200">{food.reviewerName}</strong>
                </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-0.5 text-[#FF9800] shrink-0">
                <Star
                    size={14}
                    fill="#FF9800"
                    className="text-[#FF9800]"
                />
                <span className="text-gray-700 dark:text-gray-400 text-xs font-bold ml-1">
                ({food.rating})
                </span>
            </div>
            </div>
        </div>

        {/* Button - Always at the bottom */}
        <div className="mt-5">
            <Link to={`/details-review/${food._id}`} className="block">
            <button className="w-full bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold py-2.5 rounded-xl transition duration-300 shadow-md hover:shadow-orange-500/20 active:scale-95">
                View Details
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Food;