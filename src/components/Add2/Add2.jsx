import React, { useEffect } from "react";

const Add2 = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".info-point").forEach((el) =>
      observer.observe(el)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mb-10 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-700 opacity-0 translate-y-10 info-point">
          🍽️ Celebrating <span className="text-[#FF9800]">Our Local Cuisine</span>
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-10 transition-all duration-700 opacity-0 translate-y-10 info-point">
          Discover the rich flavors and stories behind our local dishes. Learn why local food is more than just a meal—it’s a culture.
        </p>

        {/* Info Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Point 1 */}
          <div className="flex flex-col items-center md:items-start transition-all duration-700 opacity-0 translate-y-10 info-point">
            <span className="text-4xl mb-2">🥘</span>
            <h3 className="text-xl font-semibold mb-1">Why Local Food Matters</h3>
            <p className="text-gray-600">
              Local food supports our community, preserves tradition, and keeps authentic flavors alive.
            </p>
          </div>

          {/* Point 2 */}
          <div className="flex flex-col items-center md:items-start transition-all duration-700 opacity-0 translate-y-10 info-point">
            <span className="text-4xl mb-2">📖</span>
            <h3 className="text-xl font-semibold mb-1">Story of Popular Dishes</h3>
            <p className="text-gray-600">
              Learn the origins and secrets behind beloved dishes passed down through generations.
            </p>
          </div>

          {/* Point 3 */}
          <div className="flex flex-col items-center md:items-start transition-all duration-700 opacity-0 translate-y-10 info-point">
            <span className="text-4xl mb-2">🌟</span>
            <h3 className="text-xl font-semibold mb-1">What Makes Us Special</h3>
            <p className="text-gray-600">
              Our platform connects food lovers to authentic local experiences, recipes, and stories.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Add2;
