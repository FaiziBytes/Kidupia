import { useContext, useState } from "react";
import { GrMenu } from "react-icons/gr";
import logo from "../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LiaLockSolid } from "react-icons/lia";
import Sidebar from "./sidebar";
import CartSideBar from "../cart/cart";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/createUserContext";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [color, setColor] = useState("black");
  const [colorForAccount, setColorForAccount] = useState("black");
  const [lockColor, setLockColor] = useState("black");
  const {user} = useContext(UserContext);
  return (
    <div className="relative z-50">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <CartSideBar
        isOpen={isCartSidebarOpen}
        onClose={() => setIsCartSidebarOpen(false)}
      />

      {/* Background Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-40 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-4 gap-5 lg:border-b border-[#DEDEDE]">
        <div className="flex gap-4 items-center">
          {/* Mobile Menu Icon */}
          <GrMenu
            size={24}
            className="lg:hidden cursor-pointer relative z-50"
            onClick={() => setIsSidebarOpen(true)}
          />

          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className="w-40" />
          </Link>

          {/* Search bar (large screens only) */}
          <div className="hidden lg:flex items-center bg-[#F5F5F5] h-11 rounded">
            <div className="px-4 font-normal">All Categories</div>
            <div className="h-7 border-l border-[#E5E5E5] mx-2"></div>
            <input
              type="text"
              placeholder="Search Your Products"
              className="h-11 bg-[#F5F5F5] pl-4 focus:outline-none placeholder:text-[#B6B6B6]"
            />
            <IoSearch className="text-2xl px-4" />
          </div>
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-3 px-4">
          {/* Mobile search icon */}
          <IoSearch className="text-[25px] lg:hidden cursor-pointer" />

          {/* User account */}
          <Link to="/Home/Account">
            <div
              onMouseEnter={() => setColorForAccount("#E94A85")}
              onMouseLeave={() => setColorForAccount("black")}
              className="hidden lg:flex items-center gap-3 cursor-pointer"
            >
              <FaRegUser style={{ color: colorForAccount }} className="text-2xl" />
              <div>
                <p>Sign In</p>
                <p style={{ color: colorForAccount }} className="leading-3 mb-1">
                  Account
                </p>
              </div>
            </div>
          </Link>

          {/* Wishlist */}
          <FaRegHeart
            style={{ color: color }}
            onMouseEnter={() => setColor("#E94A85")}
            onMouseLeave={() => setColor("black")}
            className="text-[25px] cursor-pointer"
          />

          {/* Cart */}
          <div
            onClick={() => setIsCartSidebarOpen(true)}
            onMouseEnter={() => setLockColor("#E94A85")}
            onMouseLeave={() => setLockColor("black")}
            className="flex items-center cursor-pointer"
          >
            <LiaLockSolid style={{ color: lockColor}}
            size={25} 
            className="text-[25px]"
            />
            <div className="hidden md:block">
              {
                user? <p>faizan</p>: <p>$0.00</p>
              }             
              <p className="leading-3.5">My Cart</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
