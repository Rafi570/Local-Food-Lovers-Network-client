import React, { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

import AOS from "aos";
import "aos/dist/aos.css";
import Food from "../../components/Food/Food";
import Loading from "../../components/Loading/Loading";

const AllCard = () => {
  const axiosInstance = useAxios();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOption, setSortOption] = useState("nameAsc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/foods");
      setFoods(data);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
    AOS.init({ duration: 700 });
  }, []);

  const filteredFoods = foods
    .filter((food) =>
      food.foodName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((food) =>
      categoryFilter ? food.category === categoryFilter : true
    )
    .filter((food) =>
      ratingFilter ? food.rating >= parseFloat(ratingFilter) : true
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "nameAsc":
          return a.foodName.localeCompare(b.foodName);
        case "nameDesc":
          return b.foodName.localeCompare(a.foodName);
        case "ratingAsc":
          return a.rating - b.rating;
        case "ratingDesc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const paginatedFoods = filteredFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <h1 className="text-2xl text-center mb-4 sm:text-3xl md:text-5xl font-extrabold text-[#FF6D00] leading-tight">
        🍽️ All Foods
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by food name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9800] w-full sm:w-1/3 transition-all"
        />

        <select
          value={ratingFilter}
          onChange={(e) => {
            setRatingFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#FF9800] transition-all"
        >
          <option value="">All Ratings</option>
          <option value="5">5 & up</option>
          <option value="4">4 & up</option>
          <option value="3">3 & up</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#FF9800] transition-all"
        >
          <option value="nameAsc">Name A-Z</option>
          <option value="nameDesc">Name Z-A</option>
          <option value="ratingAsc">Rating Low → High</option>
          <option value="ratingDesc">Rating High → Low</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : paginatedFoods.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">No foods found 😔</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedFoods.map((food) => (
            <Food key={food._id} food={food} />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12 mb-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                currentPage === page
                  ? "bg-[#FF9800] border-[#FF9800] text-white shadow-lg shadow-orange-500/20"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#FF9800] dark:hover:border-[#FF9800]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCard;