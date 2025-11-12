import React, { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";

const AllReviews = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [favoriteIds, setFavoriteIds] = useState({});
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  // Fetch all reviews
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

  // Fetch user's favorites
  const fetchFavorites = async () => {
    if (!user?.email) return;
    try {
      setLoadingFavorites(true);
      const res = await axiosInstance.get(`/my-favorites?email=${user.email}`);
      const favMap = res.data.favorites.reduce((acc, fav) => {
        acc[fav.foodId] = fav._id; // foodId → favorite _id
        return acc;
      }, {});
      setFavoriteIds(favMap);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
      setFavoriteIds({});
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user?.email]);

  // Toggle favorite
  const handleFavoriteToggle = async (food) => {
    if (!user?.email || !food?._id) return;

    try {
      if (favoriteIds[food._id]) {
        // Remove favorite
        await axiosInstance.delete(`/my-favorites/${favoriteIds[food._id]}`);
        setFavoriteIds((prev) => {
          const updated = { ...prev };
          delete updated[food._id];
          return updated;
        });
      } else {
        // Add favorite
        const res = await axiosInstance.post("/my-favorites", {
          email: user.email,
          foodId: food._id,
          foodName: food.foodName,
          foodImage: food.foodImage,
          restaurantName: food.restaurantName,
        });
        setFavoriteIds((prev) => ({
          ...prev,
          [food._id]: res.data.result.insertedId,
        }));
      }
    } catch (err) {
      console.error("Favorite toggle failed:", err);
    }
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

        {/* Search Bar */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by food name..."
          className="w-full max-w-md mx-auto block border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6D00]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FF9800]/20">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Favorite
              </th>
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

          <tbody className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <tr
                key={review._id}
                className="hover:bg-[#FF9800]/10 transition-colors duration-300"
              >
                {/* Favorite Icon */}
                <td className="px-4 py-3 flex items-center justify-center">
                  <button
                    onClick={() => handleFavoriteToggle(review)}
                    disabled={loadingFavorites}
                    className={`text-2xl ${
                      favoriteIds[review._id] ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {favoriteIds[review._id] ? "❤️" : "🤍"}
                  </button>
                </td>

                {/* Food Image */}
                <td className="px-4 py-3">
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>

                {/* Food Name */}
                <td className="px-4 py-3 font-semibold text-gray-800">
                  {review.foodName}
                </td>

                {/* Restaurant */}
                <td className="px-4 py-3 text-gray-700">
                  {review.restaurantName}
                </td>

                {/* Location */}
                <td className="px-4 py-3 text-gray-700">{review.location}</td>

                {/* Rating */}
                <td className="px-4 py-3 text-yellow-500 font-bold">
                  {"⭐".repeat(review.rating)}{" "}
                  <span className="text-gray-600 font-normal">
                    ({review.rating}/5)
                  </span>
                </td>

                {/* Reviewer Email */}
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
