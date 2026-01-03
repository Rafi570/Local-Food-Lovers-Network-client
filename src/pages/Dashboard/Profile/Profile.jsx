import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";

import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";
import { app } from "../../../firebase/firebase.config";

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
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL,
        });
        alert("Profile updated successfully!");
        setEditing(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile!");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={
              userInfo.photoURL ||
              "https://i.ibb.co/2kR8s6F/default-profile.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-[#FF9800]"
          />
          {editing && (
            <input
              type="text"
              name="photoURL"
              value={userInfo.photoURL}
              onChange={handleChange}
              placeholder="Photo URL"
              className="mt-2 border border-gray-300 rounded-lg px-3 py-1 w-64 text-sm"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {editing ? (
                <input
                  type="text"
                  name="displayName"
                  value={userInfo.displayName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 w-full"
                />
              ) : (
                <>{userInfo.displayName || "Your Name"}</>
              )}
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-[#FF9800] hover:text-[#e68900]"
              title={editing ? "Cancel" : "Edit"}
            >
              <FaEdit size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-[#FF9800]" />
              <span>{userInfo.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhone className="text-[#FF9800]" />
              {editing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 w-full"
                  placeholder="Phone Number"
                />
              ) : (
                <span>{userInfo.phoneNumber || "Not provided"}</span>
              )}
            </div>
          </div>

          {editing && (
            <button
              onClick={handleSave}
              className="mt-4 bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
