import React from "react";
import { NavLink, Outlet, useNavigation, useLocation } from "react-router";
import {
  FaTachometerAlt,
  FaListAlt,
  FaUserCircle,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import Loading from "../components/Loading/Loading";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const location = useLocation();

  const dashboardRoutes = [
    {
      path: "/dashboard/overview",
      title: "Overview",
      icon: <FaTachometerAlt />,
    },
    {
      path: "/dashboard/add-review",
      title: "Add Review",
      icon: <FaListAlt />,
    },
    {
      path: "/dashboard/my-review",
      title: "My Review",
      icon: <FaUserCircle />,
    },
    {
      path: "/dashboard/my-favorites",
      title: "My Favorites",
      icon: <FaHeart />,
    },
    {
      path: "/dashboard/profile",
      title: "Profile",
      icon: <FaUserCircle />,
    },
  ];

  if (navigation.state === "loading") {
    return <Loading />;
  }

  const getTitle = () => {
    const currentRoute = dashboardRoutes.find(
      (route) => route.path === location.pathname
    );
    return currentRoute ? currentRoute.title : "Dashboard";
  };

  const activeClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-md transition-all duration-300";
  const normalClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 transition-all duration-300";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col">
        {/* 🔹 Top Navbar */}
        <nav className="navbar bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 px-4 flex justify-between transition-colors duration-300">
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden text-gray-700 dark:text-gray-200"
            >
              <FaBars size={20} />
            </label>

            <h1 className="text-xl font-bold text-orange-600 dark:text-orange-500">
              {getTitle()}
            </h1>
          </div>

          {/* 🔹 User Info */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700 dark:text-gray-200 hidden sm:block">
              {user?.displayName || "User"}
            </span>
            <div className="w-10 h-10 rounded-full border-2 border-orange-500 overflow-hidden">
                <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </nav>

        {/* 🔹 Page Content */}
        <div className="p-4 md:p-6 flex-1">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-72 bg-white dark:bg-gray-900 min-h-screen border-r dark:border-gray-800 shadow-xl transition-colors duration-300">
          {/* 🔹 Sidebar Header */}
          <NavLink to="/">
            <div className="p-6 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <h2 className="text-xl font-black text-orange-600 tracking-tight">
                FOOD LOVER
              </h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Back to Home</p>
            </div>
          </NavLink>

          {/* 🔹 Sidebar Menu */}
          <ul className="p-4 space-y-2">
            {dashboardRoutes.map((route) => (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  end={route.path === "/dashboard"}
                  className={({ isActive }) =>
                    isActive ? activeClass : normalClass
                  }
                >
                  <span className="text-lg">{route.icon}</span>
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Subtle footer in sidebar */}
          <div className="absolute bottom-4 left-6 right-6">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/20">
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">Need Help?</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Contact our support for any issues.</p>
              </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;