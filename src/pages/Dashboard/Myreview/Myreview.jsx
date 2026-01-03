import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../../contexts/AuthContext";

const Myreview = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (user?.email) {
      axiosInstance.get(`/review?email=${user.email}`).then((res) => {
        setReviews(res.data);
      });
    }
  }, [user, axiosInstance]);

  const handleDelete = (id) => {
    const isDark = document.documentElement.classList.contains('dark');
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: isDark ? '#111827' : '#fff',
      color: isDark ? '#fff' : '#000',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/review/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setReviews((prev) => prev.filter((r) => r._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
              background: isDark ? '#111827' : '#fff',
              color: isDark ? '#fff' : '#000',
            });
          }
        });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-orange-600 dark:text-orange-500 mb-2">
          My Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          All reviews you have added
        </p>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-2xl bg-white dark:bg-gray-900 border dark:border-gray-800 transition-colors">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-orange-50 dark:bg-orange-900/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Food</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Restaurant</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <tr key={rev._id} className="hover:bg-orange-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <img src={rev.foodImage} alt={rev.foodName} className="w-16 h-16 object-cover rounded-xl border dark:border-gray-700 shadow-sm" />
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800 dark:text-gray-100">{rev.foodName}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{rev.restaurantName}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm">
                    {new Date(rev.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <Link to={`/dashboard/edit-review/${rev._id}`} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <FaEdit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(rev._id)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <FaTrashAlt size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-20 text-gray-500 dark:text-gray-400 font-medium italic">
                  No reviews found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myreview;