// import React from "react";

// // ✅ Simple and production-ready Lost Password Component
// // Easy to understand and customize

// export default function ForgotPassword() {
//   const handleReset = (event) => {
//     event.preventDefault();
//     const emailOrUsername = event.target.emailOrUsername.value.trim();

//     if (!emailOrUsername) {
//       alert("Please enter your username or email.");
//       return;
//     }

//     // Here you can call your backend API to send reset link
//     console.log("Password reset link sent to:", emailOrUsername);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <form
//         onSubmit={handleReset}
//         className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Lost your password?
//         </h2>
//         <p className="text-gray-600 mb-6 text-sm">
//           Please enter your username or email address. You will receive a link
//           to create a new password via email.
//         </p>

//         <label className="block text-gray-700 mb-2 font-medium">
//           Username or Email <span className="text-pink-600">*</span>
//         </label>

//         <input
//           type="text"
//           name="emailOrUsername"
//           placeholder="Enter your username or email"
//           className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-md transition"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// }




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
