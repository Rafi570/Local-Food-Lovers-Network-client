import React, { useEffect } from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", savedTheme);
    if (savedTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);

  return (
    <div className="transition-colors duration-300">
      {/* Container-e dark mode classes add kora hoyeche */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
        
        {/* Text Area */}
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 border-b-4 border-[#FF9800] pb-2">
          404
        </h1>
        
        <p className="text-lg sm:text-xl mb-6 text-center max-w-md text-gray-600 dark:text-gray-400">
          Oops! The page you’re looking for doesn’t exist. Maybe it wandered off
          like a lost snack 🍕
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="border-2 border-[#FF9800] text-[#FF9800] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#FF9800] hover:text-white dark:hover:text-gray-900 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;