import React from "react";
import { useLoaderData } from "react-router";

const AllReviews = () => {
  const reviews = useLoaderData();

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF6D00] mb-3">
          🌟 All Food Reviews
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Check out what food lovers are saying!
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-[#FF9800]/20">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Food
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Restaurant
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Reviewer
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Review
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr
                key={review._id}
                className="hover:bg-[#FF9800]/10 transition-colors duration-300"
              >
                {/* Food Image */}
                <td className="px-4 py-3">
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>

                {/* Food Name */}
                <td className="px-4 py-3 text-gray-800 font-semibold">
                  {review.foodName}
                </td>

                {/* Restaurant */}
                <td className="px-4 py-3 text-gray-700">{review.restaurantName}</td>

                {/* Location */}
                <td className="px-4 py-3 text-gray-700">{review.location}</td>

                {/* Rating */}
                <td className="px-4 py-3 text-yellow-500 font-bold">
                  {"⭐".repeat(review.rating)}{" "}
                  <span className="text-gray-600 font-normal">({review.rating}/5)</span>
                </td>

                {/* Reviewer */}
                <td className="px-4 py-3 text-gray-700">{review.email}</td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                {/* Review Text */}
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
