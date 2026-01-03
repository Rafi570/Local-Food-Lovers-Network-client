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
      rating: Number(rating),
      reviewText,
      email: user?.email,
      createdAt: new Date().toISOString(),
    };

    axiosInstance
      .post("/add-review", newReview)
      .then((res) => {
        toast.success("Review submitted!");
        setReviewerName("");
        setRating(5);
        setReviewText("");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to submit review");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 space-y-8 overflow-hidden">
          
          {/* Food Details Section */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <img
                src={food.photo}
                alt={food.foodName}
                className="w-full h-64 md:h-full max-h-[400px] object-cover rounded-xl shadow-md border dark:border-gray-700"
              />
            </div>
            
            <div className="flex-1 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                {food.foodName}
              </h1>
              
              <div className="space-y-1 mb-4">
                <p className="text-[#FF9800] font-medium text-lg">{food.restaurantName}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                   📍 {food.location}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                  "{food.description}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Price</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{food.price}</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Rating</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">⭐ {food.rating}</p>
                </div>
              </div>

              {food.ingredients && (
                <div>
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">Ingredients:</h2>
                  <div className="flex flex-wrap gap-2">
                    {food.ingredients.map((item, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Review Form Section */}
          {user ? (
            <div className="animate-in fade-in duration-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                ✍️ Add Your Review
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="space-y-4 md:col-span-1">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] text-gray-900 dark:text-white transition-all"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      placeholder="5"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] text-gray-900 dark:text-white transition-all"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Comments</label>
                  <textarea
                    placeholder="Tell others about your experience..."
                    rows="5"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] text-gray-900 dark:text-white transition-all"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#FF9800] hover:bg-[#e68900] text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-orange-500/20 transform active:scale-[0.98]"
                  >
                    Post Review Now
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl">
               <p className="text-gray-600 dark:text-gray-400">Please login to share your experience.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsReview;