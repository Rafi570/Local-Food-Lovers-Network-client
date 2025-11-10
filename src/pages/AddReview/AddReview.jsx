import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const AddReview = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({
    reviewText,
    restaurantName,
    rating,
    location,
    foodName,
    foodImage,
  }) => {
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

    axiosInstance
      .post("/add-review", newReview)
      .then((data) => {
        console.log(data.data);
        toast.success("Review added successfully!");
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add review!");
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-[#FF9800] text-center">
        Add Your Review
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="block mb-1 font-medium">Food Name</label>
          <input
            type="text"
            {...register("foodName", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          {errors.foodName && (
            <span className="text-red-500 text-sm">Food Name is required</span>
          )}
        </div>

        {/* Food Image URL */}
        <div>
          <label className="block mb-1 font-medium">Food Image URL</label>
          <input
            type="text"
            {...register("foodImage", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          {errors.foodImage && (
            <span className="text-red-500 text-sm">Image URL is required</span>
          )}
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block mb-1 font-medium">Restaurant Name</label>
          <input
            type="text"
            {...register("restaurantName", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          {errors.restaurantName && (
            <span className="text-red-500 text-sm">
              Restaurant Name is required
            </span>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">Location is required</span>
          )}
        </div>

        {/* Star Rating */}
        <div>
          <label className="block mb-1 font-medium">Star Rating</label>
          <select
            {...register("rating", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          >
            <option value="">Select rating</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
          {errors.rating && (
            <span className="text-red-500 text-sm">Rating is required</span>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label className="block mb-1 font-medium">Review Text</label>
          <textarea
            {...register("reviewText", { required: true })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            rows="4"
          ></textarea>
          {errors.reviewText && (
            <span className="text-red-500 text-sm">
              Review Text is required
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-6 py-2 rounded-full transition duration-300"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
