import React, { useState, use } from "react";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = ({ email, password }) => {
    setLoading(true);
    signInUser(email, password)
      .then((result) => {
        toast.success("Login successful!");
        reset();
        setLoading(false);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        };

        axiosInstance
          .post("/users", userInfo)
          .then(() => {
            toast.success("Google login successful!");
            setLoading(false);
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((err) => {
            toast.error("Failed to save user: " + err.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        toast.error("Google login failed: " + error.message);
        setLoading(false);
      });
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-28 xl:pt-32 px-4">
      <div className="max-w-md mx-auto p-8  bg-white rounded-2xl shadow-lg border border-gray-100 mt-16">
        <Toaster position="top-right" reverseOrder={false} />

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <div className="text-right">
            <a href="#" className="text-sm text-[#FF9800] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold py-2.5 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
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
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/auth-register"
            className="text-[#FF9800] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
