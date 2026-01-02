import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchFavorites = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/my-favorites?email=${user.email}`
        );
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
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FF6D00] mb-3">
          ❤️ My Favorites
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Here are all the food items you marked as favorites!
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        {favorites.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-semibold text-lg italic">
            No favorites found 😔
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-[#FF9800]/20">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Food</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Restaurant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date Added</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {favorites.map((fav) => (
                <tr key={fav._id} className="hover:bg-[#FF9800]/10 transition-colors duration-300">
                  <td className="px-4 py-3">
                    <img
                      src={fav.foodImage}
                      alt={fav.foodName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{fav.foodName}</td>
                  <td className="px-4 py-3 text-gray-700">{fav.restaurantName}</td>
                  <td className="px-4 py-3 text-gray-700">{fav.location}</td>
                  <td className="px-4 py-3 text-yellow-500 font-bold">
                    {"⭐".repeat(fav.rating)}{" "}
                    <span className="text-gray-600 font-normal">({fav.rating}/5)</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(fav.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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
