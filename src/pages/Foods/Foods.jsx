import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"; 
import Food from "../../components/Food/Food";
import Loading from "../../components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";

const Foods = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/best-foods")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
            🍽️ Explore Delicious <span className="text-[#FF9800]">Foods</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover your next favorite dish from top-rated restaurants and honest
            reviewers.
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((food) => (
            <Food key={food._id} food={food} />
          ))}
        </div>

        {/* Show All Reviews Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/all-reviews")}
            className="px-8 py-3 bg-[#FF9800] text-white rounded-lg font-semibold hover:bg-[#FF6D00] transition-all transform hover:scale-105 shadow-lg active:scale-95"
          >
            Show All Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default Foods;