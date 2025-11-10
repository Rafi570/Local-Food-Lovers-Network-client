import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loading from "../Loading/Loading";

const DetailsReview = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [food, setFood] = useState(null);

  // Form state
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    axiosInstance.get(`/foods/${id}`).then(res => setFood(res.data));
  }, [id, axiosInstance]);

  if (!food) return <Loading />;

  const handleSubmit = e => {
    e.preventDefault();
    const newReview = {
      reviewerName,
      rating,
      reviewText,
    };

    // POST review to backend (assuming /foods/:id/reviews)
    // axiosInstance.post(`/foods/${id}/reviews`, newReview)
    //   .then(res => {
    //     alert("Review submitted!");
    //     setReviewerName("");
    //     setRating(5);
    //     setReviewText("");
    //     // Optionally refresh the food data
    //     axiosInstance.get(`/foods/${id}`).then(res => setFood(res.data));
    //   });
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white rounded-2xl shadow-lg space-y-6">
      <img
        src={food.photo}
        alt={food.foodName}
        className="w-full h-80 object-cover rounded-2xl shadow-md"
      />
      <h1 className="text-3xl font-bold">{food.foodName}</h1>
      <p className="text-gray-600">{food.restaurantName}</p>
      <p className="text-gray-500">{food.location}</p>
      <p className="text-gray-700">{food.description}</p>
      <p className="text-gray-800 font-semibold">Price: {food.price}</p>
      <p className="text-gray-800 font-semibold">Rating: {food.rating}</p>

      {/* Review Form */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Add Your Review</h2>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded"
            value={reviewerName}
            onChange={e => setReviewerName(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            className="border p-2 rounded"
            value={rating}
            onChange={e => setRating(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your review"
            className="border p-2 rounded"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold py-2.5 rounded-full transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsReview;
