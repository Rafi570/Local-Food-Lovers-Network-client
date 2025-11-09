import React, { useEffect, useState } from "react";
import Food from "../../components/Food/Food";
import Loading from "../../components/Loading/Loading";
import useAxios from "../../Hooks/useAxios";


const Foods = () => {
  const axiosInstance = useAxios()
  // console.log(data);
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          🍽️ Explore Delicious <span className="text-[#FF9800]">Foods</span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Discover your next favorite dish from top-rated restaurants and honest
          reviewers.
        </p>
      </div>

      {/* Food Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((food) => (
          <Food key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default Foods;
