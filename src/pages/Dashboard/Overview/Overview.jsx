import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxios from "../../../Hooks/useAxios";
import {
  Utensils,
  Star,
  MessageSquare,
  TrendingUp,
  Award,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const axiosInstance = useAxios();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axiosInstance.get("/foods");
        setFoods(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const totalFoods = foods.length;
  const avgRating =
    foods.reduce((acc, food) => acc + food.rating, 0) / (totalFoods || 1);

  // Chart Data Logic
  const ratingsCount = [0, 0, 0, 0, 0];
  foods.forEach((food) => {
    const index = Math.floor(food.rating) - 1;
    if (index >= 0 && index < 5) ratingsCount[index]++;
  });

  const data = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Total Reviews",
        data: ratingsCount,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#FF6D00");
          gradient.addColorStop(1, "#FFB300");
          return gradient;
        },
        borderRadius: 12,
        hoverBackgroundColor: "#E65100",
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: { borderDash: [5, 5], color: "#e5e7eb" },
        ticks: { stepSize: 1 },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100 rounded-full blur-[100px] opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Foodie<span className="text-[#FF6D00]">Insight</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              Detailed performance overview of your menu
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            {/* <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
              Export PDF
            </button> */}
            {/* <button className="px-5 py-2.5 bg-[#FF6D00] text-white rounded-xl font-semibold shadow-lg shadow-orange-200 hover:bg-[#E65100] transition-all">
              Add New Food
            </button> */}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Active Menu"
            value={totalFoods}
            icon={<Utensils size={24} />}
            color="bg-orange-500"
            trend="+12% from last month"
          />
          <StatCard
            label="Average Rating"
            value={avgRating}
            isDecimal
            icon={<Star size={24} />}
            color="bg-amber-400"
            trend="Very Good"
          />
          <StatCard
            label="Total Reviews"
            value={totalFoods * 8} // Dummy math
            icon={<MessageSquare size={24} />}
            color="bg-blue-500"
            trend="Updated Daily"
          />
          <StatCard
            label="Top Performance"
            value={94}
            suffix="%"
            icon={<TrendingUp size={24} />}
            color="bg-emerald-500"
            trend="Global Rank"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-md p-8 rounded-[32px] border border-white shadow-2xl shadow-slate-200/50"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Ratings Analytics
                </h3>
                <p className="text-sm text-slate-500">
                  Distribution of customer feedback
                </p>
              </div>
              <Layers className="text-slate-300" />
            </div>
            <div className="h-[350px]">
              <Bar data={data} options={options} />
            </div>
          </motion.div>

          {/* Side Info / Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1e293b] text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award size={120} />
            </div>
            <h3 className="text-xl font-bold mb-6 relative z-10">
              Performance Highlights
            </h3>

            <div className="space-y-6 relative z-10">
              <HighlightItem title="Most Loved" desc="Spicy Ramen (4.9⭐)" />
              <HighlightItem
                title="Needs Improvement"
                desc="Chicken Salad (3.2⭐)"
              />
              <HighlightItem
                title="Recent Feedback"
                desc="Great service and fast delivery!"
              />
            </div>

            {/* <button className="w-full mt-12 py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/20">
              View Detailed Reports
            </button> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const StatCard = ({
  label,
  value,
  icon,
  color,
  trend,
  isDecimal,
  suffix = "",
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100 flex flex-col justify-between h-full"
  >
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-2xl text-white ${color} shadow-lg shadow-current/20`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
        Live
      </span>
    </div>
    <div>
      <h2 className="text-3xl font-black text-slate-800">
        <CountUp end={value} decimals={isDecimal ? 1 : 0} duration={2} />
        {suffix}
      </h2>
      <p className="text-slate-500 text-sm font-medium mt-1">{label}</p>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-50">
      <p className="text-xs font-semibold text-slate-400 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"></span>
        {trend}
      </p>
    </div>
  </motion.div>
);

const HighlightItem = ({ title, desc }) => (
  <div className="group cursor-pointer">
    <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">
      {title}
    </p>
    <p className="text-slate-200 font-medium group-hover:text-white transition-colors">
      {desc}
    </p>
  </div>
);

export default Overview;
