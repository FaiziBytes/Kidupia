// Unauthorized.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react"; // optional icon (if using lucide-react)
import { UserContext } from "../contexts/createUserContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white text-center px-6">
      <div className="bg-gray-800 bg-opacity-50 rounded-3xl shadow-2xl p-10 backdrop-blur-md max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-500 bg-opacity-20 p-6 rounded-full">
            <ShieldAlert size={60} className="text-red-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">Unauthorized Access</h1>
        <p className="text-gray-300 mb-6">
          Oops! You don’t have permission to view this page.
          Please log in with the correct account or go back to safety.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all duration-300"
          >
            Go Home
          </button>

          <button
            disabled={user}
            onClick={() => navigate("/home/account")}
            className={`px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 ${
              user
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Login
          </button>
        </div>
      </div>
      <p className="mt-10 text-gray-400 text-sm">
        © {new Date().getFullYear()} Secure Admin Portal
      </p>
    </div>
  );
};

export default Unauthorized;
