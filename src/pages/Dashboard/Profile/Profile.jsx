import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTimes, FaSave } from "react-icons/fa";
import { app } from "../../../firebase/firebase.config";
import Swal from "sweetalert2";

const auth = getAuth(app);

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      setUserInfo({
        displayName: user.displayName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || "",
      });
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const isDark = document.documentElement.classList.contains('dark');
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL,
        });
        
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your changes have been saved.",
          background: isDark ? '#111827' : '#fff',
          color: isDark ? '#fff' : '#000',
          confirmButtonColor: "#FF9800",
        });
        
        setEditing(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong!",
        background: isDark ? '#111827' : '#fff',
        color: isDark ? '#fff' : '#000',
      });
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <span className="loading loading-spinner loading-lg text-orange-500"></span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 md:p-10 mt-10 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <img
              src={userInfo.photoURL || "https://i.ibb.co/2kR8s6F/default-profile.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#FF9800] p-1 shadow-lg transition-transform group-hover:scale-105"
            />
          </div>
          
          {editing && (
            <div className="w-full">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase ml-1">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                value={userInfo.photoURL}
                onChange={handleChange}
                placeholder="https://image-url.com"
                className="mt-1 w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              />
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full space-y-6">
          <div className="flex justify-between items-center border-b dark:border-gray-800 pb-4">
            <div className="flex-1 mr-4">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Full Name</label>
              {editing ? (
                <input
                  type="text"
                  name="displayName"
                  value={userInfo.displayName}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xl font-bold rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                />
              ) : (
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {userInfo.displayName || "Update Your Name"}
                </h2>
              )}
            </div>
            
            <button
              onClick={() => setEditing(!editing)}
              className={`p-3 rounded-full transition-all ${
                editing 
                ? "bg-red-50 text-red-500 dark:bg-red-900/20" 
                : "bg-orange-50 text-[#FF9800] dark:bg-orange-900/20"
              }`}
              title={editing ? "Cancel" : "Edit Profile"}
            >
              {editing ? <FaTimes size={20} /> : <FaEdit size={20} />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                <FaEnvelope className="text-orange-500" /> Email Address
              </label>
              <p className="text-gray-700 dark:text-gray-300 font-medium px-1">
                {userInfo.email}
              </p>
              {/* <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Verified</span> */}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase flex items-center gap-2">
                <FaPhone className="text-orange-500" /> Phone Number
              </label>
              {editing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 font-medium px-1">
                  {userInfo.phoneNumber || "No phone added"}
                </p>
              )}
            </div>
          </div>

          {editing && (
            <div className="pt-6 flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-[#FF9800] hover:bg-[#e68900] text-white font-bold px-8 py-3 rounded-xl transition duration-300 shadow-lg shadow-orange-500/30 transform active:scale-95"
              >
                <FaSave /> Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-6 py-3 text-gray-500 dark:text-gray-400 font-semibold hover:underline"
              >
                Discard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;