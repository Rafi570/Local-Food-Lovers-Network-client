import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  FaHome,
  FaStar,
  FaSignInAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaCommentDots,
  FaClipboardList,
  FaHeart,
} from "react-icons/fa";
import logo from "../../assets/pngtree-i-m-just-here-for-the-food-funny-fast-food-lover-png-image_2310810.jpg";
import useAuth from "../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOutUser } = useAuth();

  const handleLogout = () => {
    signOutUser()
      .then(() => toast.success("Logged out successfully!"))
      .catch((err) => toast.error("Logout failed: " + err.message));
  };

  // Links for everyone
  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
            isActive
              ? "bg-[#FF9800] text-white font-semibold shadow-md"
              : "text-gray-700 hover:bg-[#FFE0B2] hover:text-[#FF9800]"
          }`
        }
      >
        <FaHome /> Home
      </NavLink>

      <NavLink
        to="/about-us"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
            isActive
              ? "bg-[#FF9800] text-white font-semibold shadow-md"
              : "text-gray-700 hover:bg-[#FFE0B2] hover:text-[#FF9800]"
          }`
        }
      >
        <FaStar /> About
      </NavLink>

      {!user && (
        <NavLink
          to="/auth-login"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
              isActive
                ? "bg-[#FF9800] text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-[#FFE0B2] hover:text-[#FF9800]"
            }`
          }
        >
          <FaSignInAlt /> Log in
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-4 md:px-8">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Logo + Hamburger */}
      <div className="flex-1 flex items-center justify-between md:justify-start gap-3">
        <div className="flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-[#FF9800] text-lg">Food Lover</span>
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:gap-6 items-center">{links}</div>

      {/* Avatar or Protected Links */}
      {user ? (
        <div className="relative ml-2">
          {/* Avatar Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-[#FF9800] hover:scale-105 transition-transform duration-300"
          >
            <img
              alt="User avatar"
              src={user.photoURL}
              className="object-cover w-full h-full"
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <>
              <div
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-transparent z-40"
              ></div>

              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-xl transform transition-all duration-300 ease-in-out z-50">
                <div className="p-4 border-b border-gray-100 text-center">
                  <h4 className="font-semibold text-gray-800">
                    {user.displayName || "Anonymous"}
                  </h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <ul className="py-2">
                  {/* Protected Add Review Link */}
                  <li>
                    <NavLink
                      to="/add-review"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#FFF3E0] hover:text-[#FF9800] transition-colors font-semibold"
                    >
                      <FaCog /> Add Review
                    </NavLink>
                  </li>

                  <NavLink
                    to="/all-reviews"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#FFF3E0] hover:text-[#FF9800] transition-colors font-semibold"
                  >
                    <FaStar /> All Reviews
                  </NavLink>

                  {/* Profile */}
                  <li>
                    <NavLink
                      to="/my-favorites"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#FFF3E0] hover:text-[#FF9800] transition-colors font-semibold"
                    >
                      <FaHeart /> My Favorites
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-review"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#FFF3E0] hover:text-[#FF9800] transition-colors font-semibold"
                    >
                      <FaClipboardList /> My Review
                    </NavLink>
                  </li>

                  {/* Logout */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-[#FFE0B2] hover:text-red-600 font-semibold transition-colors"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      ) : null}

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-bold text-[#FF9800] text-lg">
                  Food Lover
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-circle"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col mt-4 space-y-2 px-4">
              {links}

              {/* Show Add Review in Mobile if logged in */}
              {user && (
                <NavLink
                  to="/add-review"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
                      isActive
                        ? "bg-[#FF9800] text-white font-semibold shadow-md"
                        : "text-gray-700 hover:bg-[#FFF3E0] hover:text-[#FF9800]"
                    }`
                  }
                >
                  <FaCog /> Add Review
                </NavLink>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
