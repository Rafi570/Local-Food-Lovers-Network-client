import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Loader Animation */}
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <div className="absolute w-full h-full border-4 border-[#FF9800]/30 rounded-full"></div>
        {/* Spinning Ring */}
        <div className="absolute w-full h-full border-4 border-t-[#FF9800] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-2xl font-bold text-[#FF9800] animate-pulse">
        Loading Foodie Magic...
      </h2>
    </div>
  );
};

export default Loading;
