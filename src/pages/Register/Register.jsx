import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Mail, Lock, Image as ImageIcon, ArrowRight } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { FcGoogle } from "react-icons/fc";

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
        "Password must be at least 6 characters with uppercase & lowercase"
      );
      return;
    }

    setLoading(true);

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (updateUser) {
          updateUser({ displayName: name, photoURL: photoUrl || null }).catch(
            (err) => console.error("Profile update failed:", err)
          );
        }

        const userData = {
          uid: user.uid,
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
        navigate(location.state ? location.state : "/");
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
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL || "",
          createdAt: new Date().toISOString(),
        };

        axiosInstance
          .post("/users", userData)
          .then(() => {
            toast.success("Google login successful!");
            navigate(location.state ? location.state : "/");
          })
          .catch((err) => toast.error("Server save failed: " + err.message));
      })
      .catch((err) => {
        toast.error("Google login failed.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-28 pb-12 px-4 transition-colors duration-300">
      <Toaster 
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 3000,
        }} 
      />
      
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Join Us <span className="text-[#FF9800]">✨</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Create an account to start reviewing
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all"
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs font-semibold ml-2">{errors.name.message}</span>}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs font-semibold ml-2">{errors.email.message}</span>}
            </div>

            {/* Photo URL Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Photo URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="https://image-url.com"
                  {...register("photoUrl")}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs font-semibold ml-2">{errors.password.message}</span>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-red-500 text-xs font-semibold ml-2">{errors.confirmPassword.message}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF9800] hover:bg-[#e68900] text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>Sign Up <ArrowRight size={18} /></>
              )}
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 transform active:scale-[0.98]"
            >
              <FcGoogle size={22} />
              <span className="text-gray-700 dark:text-gray-200 font-bold text-sm">Sign up with Google</span>
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/auth-login" className="text-[#FF9800] font-bold hover:underline transition-all">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;