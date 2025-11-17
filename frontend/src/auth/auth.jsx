import React, { useState, useEffect, useContext, use } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BreadcrumbBanner from "../components/breadcrumb";
import { UserContext } from "../contexts/createUserContext";
import { CartContext } from "../contexts/CartContext";
const Auth = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { fetchCart } = useContext(CartContext);
  // 🔹 Login states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // 🔹 Register states
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔹 UI feedback
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // ✅ Auto-hide message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ✅ Handle input change for both forms
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setRegisterData({ ...registerData, [name]: value });
    }
  };

  // ✅ Login submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setMessage(null);
    try {
      const res = await axios.post("http://localhost:3000/user/login", loginData, {
        withCredentials: true,
      });

      if (res.data.success) {
        setMessage({ type: "success", text: res.data.message || "Login successful!" });

        // Save token & user
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        
        // Fetch cart after login
        // Navigate after slight delay for better UX
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {navigate("/"), 1000
          fetchCart();
        });
      } else {
        setMessage({ type: "error", text: res.data.message || "Login failed!" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Server error occurred!",
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // ✅ Register submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setMessage(null);

    try {
      const res = await axios.post("http://localhost:3000/user/register", registerData);

      if (res.data.success) {
        setMessage({ type: "success", text: res.data.message || "Registered successfully!" });
        setRegisterData({ username: "", email: "", password: "" });

        // Navigate to verification page
        setTimeout(() => navigate("/verify"), 1000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setMessage({ type: "error", text: res.data.message || "Registration failed!" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Server error occurred!",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div>
      <BreadcrumbBanner />

      <div className="px-4 sm:px-8 py-10 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-16 bg-gray-50 min-h-screen">

        {/* 🔹 Login Section */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">
            Login
          </h1>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={(e) => handleChange(e, "login")}
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, "login")}
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <label className="flex items-center gap-2 text-gray-700 text-sm">
                <input type="checkbox" className="w-4 h-4 accent-[#E94A85]" />
                <span>Remember me</span>
              </label>
              <Link to="/Account/Forgot/Password">
                <p className="text-[#E94A85] text-sm font-medium hover:underline">
                  Forgot password?
                </p>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-4 bg-[#E94A85] hover:bg-[#d63d77] text-white font-semibold py-2.5 rounded-md transition disabled:opacity-70"
            >
              {loginLoading ? "Logging in..." : "LOG IN"}
            </button>
          </form>
        </div>

        {/* 🔹 Register Section */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">
            Register
          </h1>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Username <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={registerData.username}
                onChange={(e) => handleChange(e, "register")}
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={(e) => handleChange(e, "register")}
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password <span className="text-[#E94A85] font-bold">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={(e) => handleChange(e, "register")}
                className="w-full h-10 px-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#E94A85] focus:border-[#E94A85] transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={registerLoading}
              className="w-full mt-4 bg-[#E94A85] hover:bg-[#d63d77] text-white font-semibold py-2.5 rounded-md transition disabled:opacity-70"
            >
              {registerLoading ? "Registering..." : "REGISTER"}
            </button>
          </form>
        </div>
      </div>

      {/* 🔹 Global Message */}
      {message && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Auth;



// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import BreadcrumbBanner from "../components/breadcrumb";
// import { UserContext } from "../contexts/createUserContext";
// import { CartContext } from "../contexts/CartContext";

// const Auth = () => {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserContext);
//   const { fetchCart, clearCart } = useContext(CartContext);

//   // 🔹 Login states
//   const [loginData, setLoginData] = useState({ email: "", password: "" });

//   // 🔹 Register states
//   const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });

//   // 🔹 UI feedback
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [registerLoading, setRegisterLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(null), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const handleChange = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "login") setLoginData({ ...loginData, [name]: value });
//     else setRegisterData({ ...registerData, [name]: value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginLoading(true);
//     setMessage(null);

//     try {
//       const res = await axios.post("http://localhost:3000/user/login", loginData, { withCredentials: true });

//       if (res.data.success) {
//         // Save user & token
//         localStorage.setItem("token", res.data.accessToken);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         setUser(res.data.user);

//         // Fetch cart for logged-in user
//         await fetchCart();

//         setMessage({ type: "success", text: res.data.message || "Login successful!" });
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         setTimeout(() => navigate("/"), 500);
//       } else {
//         setMessage({ type: "error", text: res.data.message || "Login failed!" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: error.response?.data?.message || "Server error!" });
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setRegisterLoading(true);
//     setMessage(null);

//     try {
//       const res = await axios.post("http://localhost:3000/user/register", registerData);
//       if (res.data.success) {
//         setMessage({ type: "success", text: res.data.message || "Registered successfully!" });
//         setRegisterData({ username: "", email: "", password: "" });
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         setTimeout(() => navigate("/verify"), 500);
//       } else {
//         setMessage({ type: "error", text: res.data.message || "Registration failed!" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: error.response?.data?.message || "Server error!" });
//     } finally {
//       setRegisterLoading(false);
//     }
//   };

//   // ✅ Clear cart if user logs out
//   useEffect(() => {
//     if (!user) clearCart();
//     else fetchCart();
//   }, [user]);

//   return (
//     <div>
//       <BreadcrumbBanner />
//       <div className="px-4 sm:px-8 py-10 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-16 bg-gray-50 min-h-screen">
//         {/* Login Section */}
//         <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">
//           <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">Login</h1>
//           <form className="space-y-6" onSubmit={handleLogin}>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
//               <input type="email" name="email" value={loginData.email} onChange={(e) => handleChange(e, "login")} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-[#E94A85]" required />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Password *</label>
//               <input type="password" name="password" value={loginData.password} onChange={(e) => handleChange(e, "login")} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-[#E94A85]" required />
//             </div>
//             <div className="flex justify-between items-center">
//               <label className="flex items-center gap-2 text-gray-700 text-sm"><input type="checkbox" className="w-4 h-4 accent-[#E94A85]" /> Remember me</label>
//               <Link to="/Account/Forgot/Password"><p className="text-[#E94A85] text-sm hover:underline">Forgot password?</p></Link>
//             </div>
//             <button type="submit" disabled={loginLoading} className="w-full mt-4 bg-[#E94A85] text-white py-2.5 rounded-md">{loginLoading ? "Logging in..." : "LOG IN"}</button>
//           </form>
//         </div>

//         {/* Register Section */}
//         <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200">
//           <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-800">Register</h1>
//           <form className="space-y-6" onSubmit={handleRegister}>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Username *</label>
//               <input type="text" name="username" value={registerData.username} onChange={(e) => handleChange(e, "register")} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-[#E94A85]" required />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
//               <input type="email" name="email" value={registerData.email} onChange={(e) => handleChange(e, "register")} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-[#E94A85]" required />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Password *</label>
//               <input type="password" name="password" value={registerData.password} onChange={(e) => handleChange(e, "register")} className="w-full h-10 px-3 border rounded-md focus:ring-2 focus:ring-[#E94A85]" required />
//             </div>
//             <button type="submit" disabled={registerLoading} className="w-full mt-4 bg-[#E94A85] text-white py-2.5 rounded-md">{registerLoading ? "Registering..." : "REGISTER"}</button>
//           </form>
//         </div>
//       </div>

//       {/* Global Message */}
//       {message && (
//         <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
//           {message.text}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;
