import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const DetailsReview = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [food, setFood] = useState(null);

  // Form state
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Fetch food details
  useEffect(() => {
    axiosInstance
      .get(`/foods/${id}`)
      .then((res) => setFood(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosInstance]);

  if (!food) return <Loading />;

  // Handle review submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      foodName: food.foodName,
      foodImage: food.photo,
      location: food.location,
      restaurantName: food.restaurantName,
      rating,
      reviewText,
      email: user.email,
      createdAt: new Date().toISOString(),
    };

    axiosInstance
      .post("/add-review", newReview)
      .then((res) => {
        toast.success("Review submitted!");
        setReviewerName("");
        setRating(5);
        setReviewText("");

        // Refresh food data if needed
        axiosInstance.get(`/foods/${id}`).then((res) => setFood(res.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to submit review");
      });
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32 px-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
        {/* Food Card */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={food.photo}
            alt={food.foodName}
            className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-2xl shadow-md"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{food.foodName}</h1>
              <p className="text-gray-600 mb-1">{food.restaurantName}</p>
              <p className="text-gray-500 mb-2">{food.location}</p>
              <p className="text-gray-700 mb-2">{food.description}</p>
              <p className="text-gray-800 font-semibold">Price: {food.price}</p>
              <p className="text-gray-800 font-semibold">
                Rating: {food.rating}
              </p>
            </div>
            {food.ingredients && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-1">Ingredients:</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {food.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Add Your Review</h2>
          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
            <textarea
              placeholder="Write your review"
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
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
    </div>
  );
};

export default DetailsReview;
