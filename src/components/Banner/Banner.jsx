import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  return (
    <section className="w-full h-[80vh] md:h-[90vh] mt-16">
      {/* <h1>hasan rafi</h1> */}
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
        className="h-full w-full rounded-xl shadow-lg"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80')",
            }}
          >
            <div className="bg-black/50 p-6 rounded-xl text-center max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#FF9800]">
                Discover Local Flavors 🍲
              </h2>
              <p className="text-lg mb-4">
                Explore food reviews, hidden gems, and street eats near you!
              </p>
              <button className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-6 py-3 rounded-full transition duration-300">
                Explore Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
            }}
          >
            <div className="bg-black/50 p-6 rounded-xl text-center max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#FF9800]">
                Share Your Experience 🍛
              </h2>
              <p className="text-lg mb-4">
                Post your favorite dishes & inspire fellow food lovers.
              </p>
              <button className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-6 py-3 rounded-full transition duration-300">
                Share Now
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex flex-col justify-center items-center text-white"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1400&q=80')",
            }}
          >
            <div className="bg-black/50 p-6 rounded-xl text-center max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#FF9800]">
                Join Our Foodie Community 🥗
              </h2>
              <p className="text-lg mb-4">
                Connect with local eaters, review restaurants & enjoy together!
              </p>
              <button className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-6 py-3 rounded-full transition duration-300">
                Join Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
