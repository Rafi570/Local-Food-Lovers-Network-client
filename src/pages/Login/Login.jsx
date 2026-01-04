import React, { useState, use } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../contexts/AuthContext";
// Added Eye and EyeOff icons
import { Mail, Lock, ArrowRight, UserCheck, Eye, EyeOff } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = ({ email, password }) => {
    setLoading(true);
    signInUser(email, password)
      .then(() => {
        toast.success("Welcome back!");
        reset();
        setLoading(false);
        navigate(location.state ? location.state : "/");
      })
      .catch(() => {
        toast.error("Invalid credentials. Try again!");
        setLoading(false);
      });
  };

  const handleDemoLogin = () => {
    const demoEmail = "Demo@gmail.com"; 
    const demoPassword = "Rafi570@"; 

    setValue("email", demoEmail);
    setValue("password", demoPassword);
    handleFormSubmit({ email: demoEmail, password: demoPassword });
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
            navigate(location.state ? location.state : "/");
          })
          .catch((err) => {
            toast.error("Failed to sync user data.");
            setLoading(false);
          });
      })
      .catch(() => {
        toast.error("Google login failed.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 transition-colors duration-300">
      <Toaster 
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 3000,
        }} 
      />
      
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Welcome Back <span className="text-[#FF9800]">👋</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Log in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all placeholder:text-gray-400"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs font-semibold ml-2">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Password</label>
                <button type="button" className="text-xs text-[#FF9800] font-bold hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"} // Dynamic type
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF9800] dark:text-white transition-all placeholder:text-gray-400"
                />
                {/* Toggle Button */}
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs font-semibold ml-2">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF9800] hover:bg-[#e68900] text-white font-bold py-4 rounded-2xl transition duration-300 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Log In <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-2xl transition duration-300 shadow-md flex items-center justify-center gap-2 transform active:scale-[0.98]"
            >
              <UserCheck size={20} /> Login as Guest
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 py-3.5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300 transform active:scale-[0.98] disabled:opacity-70"
            >
              <FcGoogle size={24} />
              <span className="text-gray-700 dark:text-gray-200 font-bold">Google</span>
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/auth-register"
              className="text-[#FF9800] font-bold hover:underline transition-all"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;