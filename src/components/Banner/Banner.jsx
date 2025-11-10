import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
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
    <section className="w-full mt-16 overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full flex justify-center items-center rounded-xl overflow-hidden"
              style={{
                paddingTop: "56.25%", // 16:9 aspect ratio (responsive)
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 text-[#FF9800] leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-5 text-white max-w-lg">
                  {slide.desc}
                </p>
                <button className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full transition duration-300 text-xs sm:text-sm md:text-base">
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
