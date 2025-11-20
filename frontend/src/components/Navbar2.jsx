import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Product from "../Products/Product";
import Topdeals from "../Top-Deals/topdeals";
import { Link } from "react-router-dom";
import TodaySaleSidebar from "./today-sale";
import { MdLocalOffer } from "react-icons/md";
import { useLocation } from "react-router-dom";
const Navbar2 = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const location = useLocation(); // ✅ use this
  const shopItems = [
    {
      title: "Product Types",
      items: [
        "Simple Product",
        "Grouped Product",
        "Variable Product",
        "External/Affiliate Product",
        "Sale Product",
        "Upsell Products",
        "Cross-Sell Product",
      ],
    },
    {
      title: "WooCommerce Pages",
      items: [
        "Shop Page",
        "Shopping Cart",
        "Checkout Page",
        "My account",
        "Shop Ajax Filter",
        "Product Category",
        "Privacy Policy",
      ],
    },
    {
      title: "Product Features",
      items: [
        "Stock Progress Bar",
        "Color/Image Swatches",
        "Size Guide Table",
        "Custom Tab",
        "Countdown Timer",
        "Product Video",
        "Product Brand",
      ],
    },
  ];

  return (
    <div className="hidden lg:block relative">
      <nav className="px-5 py-5 flex items-center justify-between text-[18px] bg-white relative z-0">
        <div className="flex items-center gap-12">
          {/* 🏠 Home */}
          <Link to="/"
           style={{ color: location.pathname === "/" ? "#E94A85" : "black" }}
          >
            <p>
              Home
            </p>
          </Link>

          {/* 🛒 Shop */}
          <Link to="/shop"
           style={{ color: location.pathname === "/shop" ? "#E94A85" : "black" }}
          >
            <p >
              Shop
            </p>
          </Link>

          {/* 🧭 Categories */}
          <div
            className="flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setActiveMenu("cat")}
            onMouseLeave={() => setActiveMenu(null)}
          // onClick={() => setSelectedMenu("categories")}
          >
            <p     >
              Categories
            </p>
            <div className="bg-[#199588] text-white text-[11px] px-1 rounded-[5px]">
              SALE
            </div>
            <MdKeyboardArrowDown />
          </div>

          {/* 🧩 Products */}
          <div
            className="flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setActiveMenu("product")}
            onMouseLeave={() => setActiveMenu(null)}
          // onClick={() => setSelectedMenu("products")}
          >
            <p>
              Products
            </p>
            <MdKeyboardArrowDown />
          </div>

          {/* 💎 Top Deals */}
          <div
            onMouseEnter={() => setActiveMenu("topdeals")}
            onMouseLeave={() => setActiveMenu(null)}
            // onClick={() => setSelectedMenu("topdeals")}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <p>
              Top deals
            </p>
            <MdKeyboardArrowDown />
          </div>
        </div>

        <div
          className="hover:cursor-pointer flex items-center gap-1"
          onClick={() => setIsSidebarOpen(true)}>
            <MdLocalOffer />
          <h1>Today's Sale</h1>
        </div>
      </nav>

      {/* 🔹 CATEGORIES Dropdown */}
      <AnimatePresence>
        {activeMenu === "cat" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 right-0 flex justify-center top-full z-40"
            onMouseEnter={() => setActiveMenu("cat")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="py-5 px-8 rounded-[4px] flex w-[98%] bg-white shadow-[0_0_25px_rgba(0,0,0,0.15)]">
              {shopItems.map((section, index) => (
                <div key={index} className="w-[23%] px-3">
                  <h1 className="font-medium text-[18px] py-1 border-b border-gray-100 mb-2">
                    {section.title}
                  </h1>
                  {section.items.map((item, i) => (
                    <h1
                      key={i}
                      className="py-1 text-[16px] text-[#666666] hover:text-[#E94A85] cursor-pointer transition-colors"
                    >
                      {item}
                    </h1>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 PRODUCTS Dropdown */}
      <div
        className="absolute left-0 right-0 flex justify-center top-full z-40"
        onMouseEnter={() => setActiveMenu("product")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Product ShowDropdownforProducts={activeMenu === "product"} />
      </div>

      {/* 🔹 TOP DEALS Dropdown */}
      <div
        className="absolute left-0 right-0 flex justify-center top-full z-40"
        onMouseEnter={() => setActiveMenu("topdeals")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Topdeals showDropdownForTopDeals={activeMenu === "topdeals"} />
      </div>
      {/* making todays's sale page*/}

      <TodaySaleSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default Navbar2;