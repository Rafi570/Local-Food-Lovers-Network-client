import React, { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";

const AllReviews = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const axiosInstance = useAxios();


  const fetchReviews = async (value = "") => {
    try {
      const { data } = await axiosInstance.get(`/review?search=${value}`);
      setReviews(data);
    } catch (error) {
      // console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchReviews(value); 
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF6D00] mb-3">
          🌟 All Food Reviews
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-4">
          Check out what food lovers are saying!
        </p>

        {/* ✅ Search Bar */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by food name..."
          className="w-full max-w-md mx-auto block border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6D00]"
        />
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FF9800]/20">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Food</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Restaurant</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reviewer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Review</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-[#FF9800]/10 transition-colors duration-300">
                <td className="px-4 py-3">
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800">{review.foodName}</td>
                <td className="px-4 py-3 text-gray-700">{review.restaurantName}</td>
                <td className="px-4 py-3 text-gray-700">{review.location}</td>
                <td className="px-4 py-3 text-yellow-500 font-bold">
                  {"⭐".repeat(review.rating)}{" "}
                  <span className="text-gray-600 font-normal">
                    ({review.rating}/5)
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{review.email}</td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                  {review.reviewText}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
