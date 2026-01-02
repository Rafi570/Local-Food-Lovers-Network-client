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
    axiosInstance
      .patch(`/review/${id}`, review)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your review has been updated successfully.",
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
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Edit Review
        </h2>

        {Object.keys(review).length > 0 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Food Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Food Name
              </label>
              <input
                type="text"
                name="foodName"
                defaultValue={review.foodName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Food Image */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Food Image URL
              </label>
              <input
                type="text"
                name="foodImage"
                defaultValue={review.foodImage}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantName"
                defaultValue={review.restaurantName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Update Review
              </button>
            </div>
          </form>
        ) : (
          <p className="text-center text-gray-500">Loading review data...</p>
        )}
      </div>
    </div>
  );
};

export default EditReview;
