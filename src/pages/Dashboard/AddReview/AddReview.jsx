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
      rating,
      restaurantName,
      reviewText,
      email: user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosInstance.post("/add-review", newReview);

      // SweetAlert success popup
      Swal.fire({
        icon: "success",
        title: "Review Added!",
        text: "Your review has been submitted successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      reset();
    } catch (err) {
      console.error(err);

      // SweetAlert error popup
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again!",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FF6D00] leading-tight">
          Add Review
        </h1>
        <p className="text-gray-500 mt-2">
          Share your food experience with others
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Food Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Name
              </label>
              <input
                type="text"
                {...register("foodName", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Enter food name"
              />
              {errors.foodName && (
                <p className="text-xs text-red-500 mt-1">Food name is required</p>
              )}
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                {...register("restaurantName", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Restaurant name"
              />
              {errors.restaurantName && (
                <p className="text-xs text-red-500 mt-1">Restaurant name is required</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                placeholder="Location"
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">Location is required</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <select
                {...register("rating", { required: true })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              >
                <option value="">Select rating</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
              </select>
              {errors.rating && (
                <p className="text-xs text-red-500 mt-1">Rating is required</p>
              )}
            </div>
          </div>

          {/* Food Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image URL
            </label>
            <input
              type="text"
              {...register("foodImage", { required: true })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="https://image-url.com"
            />
            {errors.foodImage && (
              <p className="text-xs text-red-500 mt-1">Image URL is required</p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              {...register("reviewText", { required: true })}
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Write your experience..."
            ></textarea>
            {errors.reviewText && (
              <p className="text-xs text-red-500 mt-1">Review text is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
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
