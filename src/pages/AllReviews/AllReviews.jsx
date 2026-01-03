import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const AllReviews = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("dateDesc"); // 🔹 Sorting option

  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [favoriteIds, setFavoriteIds] = useState({});
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  // 🔹 Fetch all reviews
  const fetchReviews = async (value = "") => {
    try {
      setReviewsLoading(true);
      let url = `/review?search=${value}`;
      const { data } = await axiosInstance.get(url);

      // 🔹 Apply sorting
      let sortedData = [...data];
      switch (sortOption) {
        case "dateAsc":
          sortedData.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        case "dateDesc":
          sortedData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case "ratingAsc":
          sortedData.sort((a, b) => a.rating - b.rating);
          break;
        case "ratingDesc":
          sortedData.sort((a, b) => b.rating - a.rating);
          break;
        case "foodNameAsc":
          sortedData.sort((a, b) =>
            a.foodName.localeCompare(b.foodName)
          );
          break;
        case "foodNameDesc":
          sortedData.sort((a, b) =>
            b.foodName.localeCompare(a.foodName)
          );
          break;
        default:
          break;
      }

      setReviews(sortedData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [sortOption]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchReviews(value);
  };

  // 🔹 Fetch favorites
  const fetchFavorites = async () => {
    if (!user?.email) return;
    try {
      setLoadingFavorites(true);
      const res = await axiosInstance.get(`/my-favorites?email=${user.email}`);
      const favMap = res.data.favorites.reduce((acc, fav) => {
        acc[fav.foodId] = fav._id;
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

  // 🔹 Toggle favorite
  const handleFavoriteToggle = async (food) => {
    if (!user?.email || !food?._id) return;

    try {
      if (favoriteIds[food._id]) {
        await axiosInstance.delete(`/my-favorites/${favoriteIds[food._id]}`);
        setFavoriteIds((prev) => {
          const updated = { ...prev };
          delete updated[food._id];
          return updated;
        });
      } else {
        const res = await axiosInstance.post("/my-favorites", {
          email: user.email,
          foodId: food._id,
          foodName: food.foodName,
          foodImage: food.foodImage,
          location: food.location,
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
      {/* 🔸 Heading */}
      <div className="text-center mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#FF6D00] leading-tight">
          🌟 All Food Reviews
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-xl mt-2 mb-4">
          Check out what food lovers are saying!
        </p>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by food name..."
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6D00]"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6D00]"
          >
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="ratingDesc">Highest Rating</option>
            <option value="ratingAsc">Lowest Rating</option>
            <option value="foodNameAsc">Food Name A-Z</option>
            <option value="foodNameDesc">Food Name Z-A</option>
          </select>
        </div>
      </div>

      {/* 🔸 Table / Loading / Empty */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        {reviewsLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold text-lg">
            No data found 😔
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FF9800]/20">
              <tr>
                {user?.email && (
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Favorite
                  </th>
                )}
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
                  {user?.email && (
                    <td className="px-4 py-3 flex justify-center">
                      <button
                        onClick={() => handleFavoriteToggle(review)}
                        disabled={loadingFavorites}
                        className={`text-2xl ${
                          favoriteIds[review._id]
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {favoriteIds[review._id] ? "❤️" : "🤍"}
                      </button>
                    </td>
                  )}

                  <td className="px-4 py-3">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>

                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {review.foodName}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {review.restaurantName}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {review.location}
                  </td>

                  <td className="px-4 py-3 text-yellow-500 font-bold">
                    {"⭐".repeat(review.rating)}{" "}
                    <span className="text-gray-600 font-normal">
                      ({review.rating}/5)
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {review.email}
                  </td>

                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                    {review.reviewText}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
