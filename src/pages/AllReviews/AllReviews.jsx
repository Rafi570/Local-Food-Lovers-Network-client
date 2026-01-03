import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const AllReviews = () => {
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("dateDesc");

  const { user } = useAuth();
  const axiosInstance = useAxios();

  const [favoriteIds, setFavoriteIds] = useState({});
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const fetchReviews = async (value = "") => {
    try {
      setReviewsLoading(true);
      let url = `/review?search=${value}`;
      const { data } = await axiosInstance.get(url);

      let sortedData = [...data];
      switch (sortOption) {
        case "dateAsc":
          sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "dateDesc":
          sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "ratingAsc":
          sortedData.sort((a, b) => a.rating - b.rating);
          break;
        case "ratingDesc":
          sortedData.sort((a, b) => b.rating - a.rating);
          break;
        case "foodNameAsc":
          sortedData.sort((a, b) => a.foodName.localeCompare(b.foodName));
          break;
        case "foodNameDesc":
          sortedData.sort((a, b) => b.foodName.localeCompare(a.foodName));
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
    fetchReviews(search);
  }, [sortOption]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchReviews(value);
  };

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
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="text-center mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#FF6D00] leading-tight">
          🌟 All Food Reviews
        </h1>
        <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-base md:text-xl mt-2 mb-4">
          Check out what food lovers are saying!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by food name..."
            className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6D00]"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full max-w-xs bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF6D00]"
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

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-md border dark:border-gray-800">
        {reviewsLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 font-semibold text-lg">
            No data found 😔
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-[#FF9800]/20 dark:bg-[#FF9800]/10">
              <tr>
                {user?.email && (
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Favorite</th>
                )}
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Food</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Name</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Restaurant</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Location</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Rating</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Reviewer</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Date</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200">Review</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-[#FF9800]/10 dark:hover:bg-gray-800/50 transition-colors duration-300">
                  {user?.email && (
                    <td className="px-4 py-3">
                      <button onClick={() => handleFavoriteToggle(review)} disabled={loadingFavorites} className="text-2xl filter drop-shadow-sm">
                        {favoriteIds[review._id] ? "❤️" : "🤍"}
                      </button>
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <img src={review.foodImage} alt={review.foodName} className="w-16 h-16 object-cover rounded-lg border dark:border-gray-700" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100">{review.foodName}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{review.restaurantName}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{review.location}</td>
                  <td className="px-4 py-3 text-yellow-500 font-bold whitespace-nowrap">
                    ⭐ {review.rating} <span className="text-gray-500 dark:text-gray-500 font-normal text-xs">/ 5</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs italic">{review.email}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-500 text-sm whitespace-nowrap">
                    {new Date(review.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-xs text-sm">
                    <p className="line-clamp-2">{review.reviewText}</p>
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