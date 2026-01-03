import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

const Root = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (

 
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">

      <Navbar />


      <main className="min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>

      <Footer />

      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{

          className: 'dark:bg-gray-800 dark:text-white dark:border dark:border-gray-700',
        }}
      />
    </div>
  );
};

export default Root;