import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxios from "../../Hooks/useAxios";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/review/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setReviews((prev) => prev.filter((r) => r._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      {/* Title/Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-2">
          My Reviews
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          All reviews you have added
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Head */}
          <thead className="bg-gradient-to-r from-orange-200 to-orange-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Food
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Food Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Restaurant
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <tr
                  key={rev._id}
                  className="hover:bg-orange-50 transition-colors duration-300"
                >
                  {/* Food Image */}
                  <td className="px-4 py-3">
                    <img
                      src={rev.foodImage}
                      alt={rev.foodName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>

                  {/* Food Name */}
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {rev.foodName}
                  </td>

                  {/* Restaurant Name */}
                  <td className="px-4 py-3 text-gray-700">
                    {rev.restaurantName}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(rev.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center flex justify-center gap-4">
                    <Link
                      to={`/edit-review/${rev._id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 italic font-semibold"
                >
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
