import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import {
  FaHome,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaCommentDots,
  FaQuestionCircle,
  FaClipboardList,
  FaPizzaSlice,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon
} from "react-icons/fa";
import logo from "../../assets/pngtree-i-m-just-here-for-the-food-funny-fast-food-lover-png-image_2310810.jpg";
import useAuth from "../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully!"))
      .catch((err) => toast.error("Logout failed: " + err.message));
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
      isActive
        ? "bg-[#FF9800] text-white font-semibold shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-[#FFE0B2] dark:hover:bg-gray-700 hover:text-[#FF9800]"
    }`;

  return (
    <nav className="navbar bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-colors duration-300">
      <Toaster position="top-right" />

      {/* Left: Logo */}
      <div className="flex-1">
        <NavLink to="/" className="flex items-center gap-3 w-fit">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-[#FF9800]" />
          <span className="font-bold text-[#FF9800] text-xl hidden sm:block">Food Lover</span>
        </NavLink>
      </div>

      {/* Right: Menu & Actions */}
      <div className="flex items-center gap-2">
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-2 mr-2">
          <NavLink to="/" className={navClass}>
            <FaHome /> Home
          </NavLink>
          <NavLink to="/all-foods" className={navClass}>
            <FaPizzaSlice /> All Foods
          </NavLink>
          {!user && (
            <NavLink to="/auth-login" className={navClass}>
              <FaSignInAlt /> Login
            </NavLink>
          )}
        </div>

        {/* User Profile + Theme Toggle (Inside Dropdown) */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FF9800] hover:scale-105 transition-transform"
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {menuOpen && (
              <>
                <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40"></div>
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-800/50">
                    <h4 className="font-semibold truncate">{user.displayName}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>

                  <ul className="py-2">
                    {/* Theme Toggle Inside Dropdown */}
                    <li>
                      <button 
                        onClick={handleTheme}
                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-[#FFF3E0] dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {theme === "dark" ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-indigo-600" />}
                          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                        </div>
                        <span className="text-[10px] bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded uppercase">
                          {theme}
                        </span>
                      </button>
                    </li>
                    
                    <div className="border-t dark:border-gray-700 my-1"></div>

                    <li>
                      <NavLink to="/all-reviews" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF3E0] dark:hover:bg-gray-700">
                        <FaClipboardList /> All Reviews
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/overview" className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF3E0] dark:hover:bg-gray-700">
                        <FaUser /> Dashboard
                      </NavLink>
                    </li>

                    <div className="border-t dark:border-gray-700 my-1"></div>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-medium"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        ) : (
          /* Show theme toggle outside only if user is NOT logged in (Desktop) */
          <button onClick={handleTheme} className="hidden md:flex btn btn-ghost btn-circle text-[#FF9800]">
             {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost btn-circle md:hidden dark:text-white"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)}></div>
          <div className="fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 z-50 shadow-2xl transition-all">
            <div className="p-5 border-b dark:border-gray-800 flex justify-between items-center">
              <span className="font-bold text-[#FF9800] text-xl">Food Lover</span>
              <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-circle btn-ghost dark:text-white"><FaTimes /></button>
            </div>

            <div className="flex flex-col mt-4 space-y-2 px-4">
              {/* Mobile Theme Toggle */}
              <button 
                onClick={handleTheme}
                className="flex items-center gap-2 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                {theme === "dark" ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-indigo-500" />}
                <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
              </button>

              <NavLink to="/" onClick={() => setIsOpen(false)} className={navClass}>
                <FaHome /> Home
              </NavLink>
              <NavLink to="/all-foods" onClick={() => setIsOpen(false)} className={navClass}>
                <FaPizzaSlice /> All Foods
              </NavLink>

              {!user && (
                <NavLink to="/auth-login" onClick={() => setIsOpen(false)} className={navClass}>
                  <FaSignInAlt /> Login
                </NavLink>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;