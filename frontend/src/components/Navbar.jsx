import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import logo from "../assets/logo.svg";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { LiaLockSolid } from "react-icons/lia";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import CartSideBar from "../cart/cart";


const Navbar = () => {
  // sidebar open/close control
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [color,setColor] = useState("black")
  const[colorForAccount,setColorForAccount] = useState("black");
  const[lockColor,setLockColor] = useState("black");
   return (
    <div className="relative z-1000">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <CartSideBar isOpen={isCartSidebarOpen} onClose={()=> setIsCartSidebarOpen(false)}/>  
      {/* Background Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-40 z-140"
      //     onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-[4px] py-7 gap-5 lg:border-b-1 border-[#DEDEDE]">
        <div className="flex gap-10 pl-4">
          {/* Logo & Menu Icon */}
          <div className="flex items-center gap-4 lg:gap-2">
            <GrMenu
              size={24}
              className="lg:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(true)} // open sidebar on click
            />
           <Link to="/"><img className="w-40" src={logo} alt="this is an image" /></Link>
          </div>

          {/* Search bar (visible only on large screens) */}
          <div className="hidden lg:flex items-center bg-[#F5F5F5]">
            <div className="bg-[#F5F5F5] flex items-center h-11 px-4 rounded-tl-[3px] rounded-bl-[3px]">
              <h1 className="text-[18px] font-normal">All Categories</h1>
            </div>

            {/* Vertical line */}
            <h1 className="h-7 border-1 border-[#E5E5E5]"></h1>

            <div className="flex items-center">
              <input
                className="width focus:outline-none focus:placeholder:text-[#1E1E1E] focus:placeholder:visible placeholder:text-[#B6B6B6] pl-4 h-11 bg-[#F5F5F5] text-[17px]"
                type="text"
                placeholder="Search Your Products"
              />
              <div className="px-4">
                <IoSearch className="text-[22px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right-side icons */}
        <div className="px-4">
          <div className="flex items-center gap-3">
            {/* Mobile search icon */}
            <div className="visible lg:hidden">
              <IoSearch className="text-[25px]" />
            </div>

            {/* User account */}
            <Link to="/Home/Account">
            <div
            onMouseEnter={()=> setColorForAccount("#E94A85")}
            onMouseLeave={()=> setColorForAccount("black")}
            className="lg:flex items-center gap-3 hidden hover:cursor-pointer">
              <FaRegUser
              style={{color:colorForAccount}}
              className="text-[27px]" />
              <div>
                <p>Sign In</p>
                <p 
                style={{color:colorForAccount}}
                className="leading-3 mb-1">Account</p>
              </div>
            </div>
            </Link>
            {/* Wishlist */}
            <FaRegHeart 
            style={{color:color}}
            onMouseEnter={()=> setColor("#E94A85")}
            onMouseLeave={()=>setColor("black")}
            className="text-[25px] hover:cursor-pointer" />

            {/* Cart */}
            <div 
            onClick={()=> setIsCartSidebarOpen(true)}
            onMouseEnter={()=> setLockColor("#E94A85")}
            onMouseLeave={()=> setLockColor("black")}
            className="flex items-center hover:cursor-pointer">
              <LiaLockSolid 
              style={{color:lockColor}}
              className="text-[33px]" />
              <div className="hidden md:block">
                <p>$0.00</p>
                <p className="leading-3.5">My Cart</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
