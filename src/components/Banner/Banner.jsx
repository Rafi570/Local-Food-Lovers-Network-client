import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
      title: "Discover Local Flavors 🍲",
      desc: "Explore food reviews, hidden gems, and street eats near you!",
      button: "Explore Now",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
      title: "Share Your Experience 🍛",
      desc: "Post your favorite dishes & inspire fellow food lovers.",
      button: "Share Now",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1600&q=80",
      title: "Join Our Foodie Community 🥗",
      desc: "Connect with local eaters, review restaurants & enjoy together!",
      button: "Join Now",
    },
  ];

  return (
    // mt-16 বজায় রাখা হয়েছে যাতে নেভবারের নিচে থাকে
    <section className="w-full mt-16 overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          0: { navigation: false }, // mobile
          768: { navigation: true }, // tablet & up
        }}
        modules={[Autoplay, Pagination, Navigation]}
        // Swiper এর ডিফল্ট নীল রঙ পরিবর্তন করে অরেঞ্জ করা হলো
        style={{
            "--swiper-navigation-color": "#FF9800",
            "--swiper-pagination-color": "#FF9800",
          }}
        className="w-full h-[42vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[650px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="
                relative w-full h-full
                flex justify-center items-center
                // rounded-xl বাদ দেওয়া হলো যাতে ব্যানারটি পুরো স্ক্রিন জুড়ে থাকে (ঐচ্ছিক, আপনি চাইলে রাখতে পারেন)
                overflow-hidden
              "
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay: ডার্ক মোডে এটি আরও গাঢ় হবে (bg-black/70) */}
              <div className="absolute inset-0 bg-black/50 dark:bg-black/70 transition-colors duration-500"></div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 text-[#FF9800] leading-tight drop-shadow-lg">
                  {slide.title}
                </h2>

                {/* টেক্সট সবসময় সাদাই থাকবে কারণ ব্যাকগ্রাউন্ড সবসময় ডার্ক */}
                <p className="text-sm sm:text-base md:text-lg mb-5 text-gray-100 max-w-lg drop-shadow-md">
                  {slide.desc}
                </p>

                <button className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full transition duration-300 shadow-lg">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;