import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

const AddReview = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({
    reviewText,
    restaurantName,
    rating,
    location,
    foodName,
    foodImage,
  }) => {
    if (!user?.email) return;

    const newReview = {
      foodName,
      foodImage,
      location,
      rating: Number(rating),
      restaurantName,
      reviewText,
      email: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/add-review", newReview);

      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Your review has been submitted successfully.",
        showConfirmButton: false,
        timer: 2000,
        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      });

      reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again!",
        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-0">
      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FF6D00] leading-tight">
          Add Review
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Share your food experience with others
        </p>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Food Name
              </label>
              <input
                type="text"
                {...register("foodName", { required: true })}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Enter food name"
              />
              {errors.foodName && (
                <p className="text-xs text-red-500 mt-1">Food name is required</p>
              )}
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                {...register("restaurantName", { required: true })}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Restaurant name"
              />
              {errors.restaurantName && (
                <p className="text-xs text-red-500 mt-1">Restaurant name is required</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: true })}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition-all"
                placeholder="Location"
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">Location is required</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <select
                {...register("rating", { required: true })}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition-all"
              >
                <option value="" className="dark:bg-gray-800">Select rating</option>
                <option value="1" className="dark:bg-gray-800">⭐ (1)</option>
                <option value="2" className="dark:bg-gray-800">⭐⭐ (2)</option>
                <option value="3" className="dark:bg-gray-800">⭐⭐⭐ (3)</option>
                <option value="4" className="dark:bg-gray-800">⭐⭐⭐⭐ (4)</option>
                <option value="5" className="dark:bg-gray-800">⭐⭐⭐⭐⭐ (5)</option>
              </select>
              {errors.rating && (
                <p className="text-xs text-red-500 mt-1">Rating is required</p>
              )}
            </div>
          </div>

          {/* Food Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Food Image URL
            </label>
            <input
              type="text"
              {...register("foodImage", { required: true })}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition-all"
              placeholder="https://image-url.com"
            />
            {errors.foodImage && (
              <p className="text-xs text-red-500 mt-1">Image URL is required</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Review
            </label>
            <textarea
              {...register("reviewText", { required: true })}
              rows="4"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition-all"
              placeholder="Tell us about the taste and service..."
            ></textarea>
            {errors.reviewText && (
              <p className="text-xs text-red-500 mt-1">Review text is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20 transform active:scale-95"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;