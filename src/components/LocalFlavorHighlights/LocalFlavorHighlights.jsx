import React from "react";

const LocalFlavorHighlights = () => {
  return (
    <section
      className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] 2xl:h-[100vh] rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ddd",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 lg:px-12 w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 text-[#FF9800] leading-snug sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight">
          Taste the Culture, Feel the Love ❤️
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-6 text-white leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed">
          From spicy street food in Dhaka to traditional sweets in Barishal —  
          discover the stories behind every bite and the people who make them special.
        </p>
        <button className="bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3 md:py-4 rounded-full transition duration-300 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          Explore Stories
        </button>
      </div>
    </section>
  );
};

export default LocalFlavorHighlights;
