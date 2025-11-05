import BreadcrumbBanner from "../components/breadcrumb";
import { Link } from "react-router-dom";
const Auth = () => {
  return (
    <div>
      <BreadcrumbBanner />

      {/* Outer container with responsive layout */}
      <div className="px-4 sm:px-8 py-10 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-16 bg-gray-50 min-h-screen">
        
        {/* Login Section */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">
            Login
          </h1>

          <form className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username or Email Address{" "}
                <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password{" "}
                <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="password"
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <label className="flex items-center gap-2 text-gray-700 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#E94A85] cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <Link to="/Account/Forgot/Password">
              <p
                
                className="text-[#E94A85] text-sm font-medium hover:underline"
              >
                Forgot password?
              </p>
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#E94A85] hover:bg-[#d63d77] text-white font-semibold py-2.5 rounded-md transition">
              LOG IN
            </button>
          </form>
        </div>

        {/* Register Section */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">
            Register
          </h1>

          <form className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username{" "}
                <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address{" "}
                <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="email"
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password{" "}
                <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="password"
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-[#E94A85] hover:bg-[#d63d77] text-white font-semibold py-2.5 rounded-md transition"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
