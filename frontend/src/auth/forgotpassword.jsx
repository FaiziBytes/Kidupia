import React from "react";
import BreadcrumbBanner from "../components/breadcrumb";

// ✅ LostPassword.jsx — clean, left-aligned layout matching your screenshot
export default function LostPassword() {
  const handleReset = (event) => {
    event.preventDefault();
    const emailOrUsername = event.target.emailOrUsername.value.trim();

    if (!emailOrUsername) {
      alert("Please enter your username or email.");
      return;
    }

    // Replace this with API call
    console.log("Password reset link sent to:", emailOrUsername);
  };

  return (
      <div>
            <BreadcrumbBanner/>
    <div className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="w-full lg:w-3/4 xl:w-2/3 text-left">
          <p className="text-gray-700 text-lg mb-8">
            Lost your password? Please enter your username or email address.
            You will receive a link to create a new password via email.
          </p>

          <form onSubmit={handleReset}>
            <label className="block text-gray-800 font-medium mb-2">
              Username or email <span className="text-pink-600">*</span>
            </label>

            <input
              type="text"
              name="emailOrUsername"
              placeholder="Enter username or email"
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold uppercase px-8 py-3 rounded-md shadow-sm"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
