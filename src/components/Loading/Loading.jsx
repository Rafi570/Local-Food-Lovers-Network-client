import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Loader Animation */}
      <div className="relative w-20 h-20">
        {/* Outer Ring - ডার্ক মোডে এর অপাসিটি কিছুটা কমানো হয়েছে */}
        <div className="absolute w-full h-full border-4 border-[#FF9800]/20 dark:border-[#FF9800]/10 rounded-full"></div>
        
        {/* Spinning Ring */}
        <div className="absolute w-full h-full border-4 border-t-[#FF9800] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Inner Pulse Dot (ঐচ্ছিক: লুক আরও সুন্দর করার জন্য) */}
        <div className="absolute inset-6 bg-[#FF9800]/20 rounded-full animate-ping"></div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2 className="mt-6 text-2xl font-bold text-[#FF9800] animate-pulse">
          Loading Foodie Magic...
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Preparing the best flavors for you
        </p>
      </div>
    </div>
  );
};

export default Loading;