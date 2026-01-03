import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const EditReview = () => {
  const { id } = useParams();
  const [review, setReview] = useState({});
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  // Fetch existing review data
  useEffect(() => {
    axiosInstance.get(`/review/${id}`).then((res) => {
      setReview({
        foodName: res.data.foodName,
        foodImage: res.data.foodImage,
        restaurantName: res.data.restaurantName,
      });
    });
  }, [id, axiosInstance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDark = document.documentElement.classList.contains('dark');

    axiosInstance
      .patch(`/review/${id}`, review)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your review has been updated successfully.",
            background: isDark ? '#111827' : '#fff',
            color: isDark ? '#fff' : '#000',
            confirmButtonColor: "#f97316",
          }).then(() => {
            navigate("/dashboard/my-review");
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Try again!",
          background: isDark ? '#111827' : '#fff',
          color: isDark ? '#fff' : '#000',
        });
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-extrabold text-orange-600 dark:text-orange-500 mb-8 text-center">
          Edit Review
        </h2>

        {Object.keys(review).length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Food Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                value={review.foodName || ""}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all"
                placeholder="Enter food name"
              />
            </div>

            {/* Food Image */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                Food Image URL
              </label>
              <input
                type="text"
                name="foodImage"
                value={review.foodImage || ""}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all"
                placeholder="https://image-url.com"
              />
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                value={review.restaurantName || ""}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 transition-all"
                placeholder="Restaurant name"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg shadow-orange-600/20 transition-all transform active:scale-95"
              >
                Update Review
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center py-10">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
            <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">Loading review data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditReview;