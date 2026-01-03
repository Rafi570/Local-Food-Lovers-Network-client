import React from "react";
import {
  NavLink,
  Outlet,
  useNavigation,
  useLocation,
} from "react-router";
import {
  FaTachometerAlt,
  FaListAlt,
  FaUserCircle,
  FaHeart,
} from "react-icons/fa";
import Loading from "../components/Loading/Loading";
import useAuth from "../Hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const location = useLocation();

  // 🔹 Dashboard Routes Config (icon + title)
  const dashboardRoutes = [
    {
      path: "/dashboard",
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
  ];

  // 🔹 Show loading on every route change
  if (navigation.state === "loading") {
    return <Loading />;
  }

  // 🔹 Dynamic Navbar Title
  const getTitle = () => {
    const currentRoute = dashboardRoutes.find(
      (route) => route.path === location.pathname
    );
    return currentRoute ? currentRoute.title : "Dashboard";
  };

  const activeClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500 text-white font-semibold";
  const normalClass =
    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-orange-100";

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= Main Content ================= */}
      <div className="drawer-content flex flex-col">
        {/* 🔹 Top Navbar */}
        <nav className="navbar bg-white shadow-sm px-4 flex justify-between">
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
              ☰
            </label>

            <h1 className="text-xl font-bold text-orange-600">
              {getTitle()}
            </h1>
          </div>

          {/* 🔹 User Info */}
          <div className="flex items-center gap-2 text-gray-700">
            <FaUserCircle className="text-xl" />
            <span className="font-medium">
              {user?.displayName || "User"}
            </span>
          </div>
        </nav>

        {/* 🔹 Page Content */}
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </div>

      {/* ================= Sidebar ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-72 bg-white min-h-screen border-r shadow-sm">
          {/* 🔹 Sidebar Header */}
          <NavLink to="/">
            <div className="p-6 border-b">
              <h2 className="text-lg font-bold text-orange-600">
                Dashboard Menu
              </h2>
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
                  {route.icon}
                  {route.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
