import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const { signInWithGoogle, createUser, updateUser } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = ({ name, email, photoUrl, password }) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase & lowercase"
      );
      return;
    }

    setLoading(true);

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (updateUser) {
          updateUser({ displayName: name, photoURL: photoUrl || null }).catch(
            (err) => toast.error("Profile update failed: " + err.message)
          );
        }

        const userData = {
          uid: user.uid, // ✅ Include UID
          name,
          email,
          photoUrl: photoUrl || "",
          createdAt: new Date().toISOString(),
        };

        axiosInstance
          .post("/users", userData)
          .then(() => toast.success("Registration successful!"))
          .catch((err) => toast.error("Server save failed: " + err.message));

        reset();
        setLoading(false);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        toast.error("Registration failed: " + err.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);

    signInWithGoogle()
      .then((result) => {
        const user = result.user;

        const userData = {
          uid: user.uid, // ✅ Include UID
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL || "",
          createdAt: new Date().toISOString(),
        };

        axiosInstance
          .post("/users", userData)
          .then(() => toast.success("Google login successful!"))
          .catch((err) => toast.error("Server save failed: " + err.message));

        setLoading(false);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        toast.error("Google login failed: " + err.message);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          {...register("name", { required: "Name is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}

        <input
          type="text"
          placeholder="Photo URL"
          {...register("photoUrl")}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 flex items-center"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg"
        >
          {loading ? "Processing..." : "Register"}
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2.5 rounded-full hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link
          to="/auth-login"
          className="text-[#FF9800] font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
