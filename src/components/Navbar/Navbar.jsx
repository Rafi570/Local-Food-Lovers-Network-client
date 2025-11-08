import React, { useState } from "react";
import { NavLink } from "react-router";
// import { FaHome, FaStar, FaPhone } from "react-icons/fa";
import { FaHome, FaStar, FaPhone, FaSignInAlt } from "react-icons/fa";
import logo from "../../assets/pngtree-i-m-just-here-for-the-food-funny-fast-food-lover-png-image_2310810.jpg";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  to="/all-reviews"
  className={({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition duration-300 ${
      isActive
        ? "bg-[#FF9800] text-white font-semibold shadow-md"
        : "text-gray-700 hover:bg-[#FFE0B2] hover:text-[#FF9800]"
    }`
  }
>
  <FaStar /> All Reviews
</NavLink>

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

    </>
  );

  return (
    <div className="navbar bg-white shadow-md fixed top-0 left-0 right-0 z-50 px-4 md:px-8">
      {/* Logo + Hamburger + Avatar */}
      <div className="flex-1 flex items-center justify-between md:justify-start gap-3">
        <div className="flex items-center gap-3">
          <NavLink to="/" className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-bold text-[#FF9800] text-lg">
                  Food Lover
                </span>
              </NavLink>
        </div>

        {/* Mobile hamburger */}
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

      {/* Avatar */}
      <div className="dropdown dropdown-end ml-2">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
        >
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a>Logout</a>
          </li>
        </ul>
      </div>

      {/* Mobile Slide-in Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Slide-in panel */}
          <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
            {/* Logo + Close Button */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <NavLink to="/" className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-bold text-indigo-700 text-lg">
                    Food Lover
                  </span>
                </NavLink>
              </div>
              <button
                onClick={() => setIsOpen(false)}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col mt-4 space-y-2 px-4">{links}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
