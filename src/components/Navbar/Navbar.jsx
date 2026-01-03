import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  FaHome,
  FaStar,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
  FaCommentDots,
  FaQuestionCircle,
  FaClipboardList,
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

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
      isActive
        ? "bg-[#FF9800] text-white font-semibold shadow-md"
        : "text-gray-700 hover:bg-[#FFE0B2] hover:text-[#FF9800]"
    }`;

  return (
    <div className="navbar bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-4 md:px-8">
      <Toaster position="top-right" />

      {/* Logo */}
      <div className="flex-1 flex items-center justify-between md:justify-start gap-3">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="font-bold text-[#FF9800] text-lg">Food Lover</span>
        </NavLink>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost btn-circle md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:gap-4 items-center">
        <NavLink to="/" className={navClass}>
          <FaHome /> Home
        </NavLink>

        <NavLink to="/all-foods" className={navClass}>
          <FaStar /> All Foods
        </NavLink>

        {!user && (
          <NavLink to="/auth-login" className={navClass}>
            <FaSignInAlt /> Login
          </NavLink>
        )}
      </div>

      {/* User Avatar */}
      {user && (
        <div className="relative ml-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FF9800]"
          >
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {menuOpen && (
            <>
              <div
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40"
              ></div>

              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl z-50">
                <div className="p-4 border-b text-center">
                  <h4 className="font-semibold">{user.displayName}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <ul className="py-2">
                  <li>
                    <NavLink
                      to="/all-reviews"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF3E0]"
                    >
                      <FaClipboardList /> All Reviews
                    </NavLink>
                  </li>
                                    <li>
                    <NavLink
                      to="/support"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF3E0]"
                    >
                      <FaUser /> Help center
                    </NavLink>
                  </li>


                  <li>
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#FFF3E0]"
                    >
                      <FaUser /> Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#FFE0B2] text-red-600"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg">
            <div className="p-4 border-b flex justify-between">
              <span className="font-bold text-[#FF9800]">Food Lover</span>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="flex flex-col mt-4 space-y-2 px-4">
              <NavLink to="/" className={navClass}>
                <FaHome /> Home
              </NavLink>

              <NavLink to="/about-us" className={navClass}>
                <FaStar /> About
              </NavLink>

              {!user && (
                <NavLink to="/auth-login" className={navClass}>
                  <FaSignInAlt /> Login
                </NavLink>
              )}

              {user && (
                <>
                  <NavLink to="/add-review" className={navClass}>
                    <FaCommentDots /> Add Review
                  </NavLink>
                  <NavLink to="/support" className={navClass}>
                    <FaQuestionCircle /> Help Center
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
