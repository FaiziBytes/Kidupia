import { useContext, useEffect, useState, useRef } from "react";
import { GrMenu } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { LiaLockSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Sidebar from "./sidebar";
import CartSideBar from "../cart/cart";
import { UserContext } from "../contexts/createUserContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../contexts/CartContext";
import { useSearch } from "../contexts/SearchContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("black");
  const [colorForAccount, setColorForAccount] = useState("black");
  const [lockColor, setLockColor] = useState("black");

  const { user, setUser } = useContext(UserContext);
  const { clearCart, cart } = useContext(CartContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { searchQuery, updateSearch } = useSearch();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [setUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("User not logged in or token missing");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/user/logout",
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (res.data.success) toast.success(res.data.message || "Logout successful!");

      clearCart();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setDropdownOpen(false);
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative z-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <CartSideBar isOpen={isCartSidebarOpen} onClose={() => setIsCartSidebarOpen(false)} />

      <nav className="flex items-center justify-between px-4 py-4 gap-5 lg:border-b border-[#DEDEDE] bg-white">
        <div className="flex gap-4 items-center">
          <GrMenu size={24} className="lg:hidden cursor-pointer" onClick={() => setIsSidebarOpen(true)} />
          <Link to="/"><img src={logo} alt="Logo" className="w-40" /></Link>

          {/* 🔥 UPDATED SEARCH BAR (NOW WORKS FOR SHOP PAGE) */}
          <div className="hidden lg:flex items-center bg-[#F5F5F5] h-11 rounded">
            <div className="px-4 font-normal">All Categories</div>
            <div className="h-7 border-l border-[#E5E5E5] mx-2"></div>
            
            <input
              type="text"
              placeholder="Search Your Products"
              value={searchQuery}
              onChange={(e) => {
                updateSearch(e.target.value); // update global search
                navigate("/shop");            // 🔥 go to shop page instantly
              }}
              className="h-11 bg-[#F5F5F5] pl-4 focus:outline-none placeholder:text-[#B6B6B6]"
            />
            <IoSearch className="text-2xl px-4" />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4">
          <IoSearch className="text-[25px] lg:hidden cursor-pointer" />

          <div className="relative hidden lg:block" ref={dropdownRef}>
            <div
              onClick={() => user ? setDropdownOpen(!dropdownOpen) : navigate("/Home/Account")}
              onMouseEnter={() => setColorForAccount("#E94A85")}
              onMouseLeave={() => setColorForAccount("black")}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <FaRegUser style={{ color: colorForAccount }} className="text-2xl" />
              <div>
                {user ? <p>{user.username}</p> : <p>Sign In</p>}
                <p className="leading-3.5 text-sm" style={{ color: user ? colorForAccount : "inherit" }}>
                  {user ? "My Account" : "Welcome Back!"}
                </p>
              </div>
            </div>

            {user && dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-100 py-2">
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Orders</Link>
                <Link to="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Wishlist</Link>
                <hr className="my-1" />
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>

          <FaRegHeart
            style={{ color }}
            onMouseEnter={() => setColor("#E94A85")}
            onMouseLeave={() => setColor("black")}
            className="text-[25px] cursor-pointer"
          />

          <div
            onClick={() => setIsCartSidebarOpen(true)}
            onMouseEnter={() => setLockColor("#E94A85")}
            onMouseLeave={() => setLockColor("black")}
            className="flex items-center cursor-pointer"
          >
            <LiaLockSolid style={{ color: lockColor }} size={25} />
            <div className="hidden md:block">
              <p>${cart?.totalPrice || "0.00"}</p>
              <p className="leading-3.5">My Cart</p>
            </div>
          </div>
        </div>
      </nav>

      <ToastContainer position="bottom-right" autoClose={1000} />
    </div>
  );
};

export default Navbar;
