import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchFavorites = async () => {
      try {
        const { data } = await axiosInstance.get(`/my-favorites?email=${user.email}`);
        if (data.success) {
          setFavorites(data.favorites);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [user?.email]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#FF6D00] mb-3">
          ❤️ My Favorites
        </h1>
        <p className="text-gray-700 dark:text-gray-400 text-lg">
          Here are all the food items you marked as favorites!
        </p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border dark:border-gray-800 transition-colors">
        {favorites.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 font-semibold text-lg italic">
            No favorites found 😔
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-[#FF9800]/10 dark:bg-[#FF9800]/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Food</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Date Added</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {favorites.map((fav) => (
                <tr key={fav._id} className="hover:bg-[#FF9800]/5 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={fav.foodImage} alt={fav.foodName} className="w-16 h-16 object-cover rounded-xl border dark:border-gray-700 shadow-sm" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 dark:text-gray-100">{fav.foodName}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{fav.restaurantName}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{fav.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      ⭐ {fav.rating} <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">/ 5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm whitespace-nowrap">
                    {new Date(fav.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
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

export default MyFavorites;