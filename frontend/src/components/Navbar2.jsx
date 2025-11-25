// import { MdKeyboardArrowDown } from "react-icons/md";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Product from "../Products/Product";
// import Topdeals from "../Top-Deals/topdeals";
// import { Link } from "react-router-dom";
// import TodaySaleSidebar from "./today-sale";
// import { MdLocalOffer } from "react-icons/md";
// import { useLocation } from "react-router-dom";

// const shopItems = [
//   {
//     title: "Popular Categories",
//     items: [
//       "Kids Food",
//       "bath & skin care",
//       "health & safety",
//       "gear & Nursery",
//       "footware",
//       "Baby kids clothe",
//       "Kids clothe",
//     ],
//   },
// ];

// const Navbar2 = () => {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div className="hidden lg:block relative">
//       <nav className="px-5 py-5 flex items-center justify-between text-[18px] bg-white relative z-0">
//         <div className="flex items-center gap-12">
          
//           {/* HOME */}
//           <Link
//             to="/"
//             style={{ color: location.pathname === "/" ? "#E94A85" : "black" }}
//           >
//             <p>Home</p>
//           </Link>

//           {/* SHOP */}
//           <Link
//             to="/shop"
//             style={{ color: location.pathname === "/shop" ? "#E94A85" : "black" }}
//           >
//             <p>Shop</p>
//           </Link>

//           {/* CATEGORIES */}
//           <div
//             className="flex items-center gap-1 cursor-pointer relative"
//             onMouseEnter={() => setActiveMenu("cat")}
//             onMouseLeave={() => setActiveMenu(null)}
//           >
//             <p>Categories</p>
//             <div className="bg-[#199588] text-white text-[11px] px-1 rounded-[5px]">
//               SALE
//             </div>
//             <MdKeyboardArrowDown />
//           </div>

//           {/* PRODUCTS */}
//           <div
//             className="flex items-center gap-1 cursor-pointer relative"
//             onMouseEnter={() => setActiveMenu("product")}
//             onMouseLeave={() => setActiveMenu(null)}
//           >
//             <p>Products</p>
//             <MdKeyboardArrowDown />
//           </div>

//           {/* TOP DEALS */}
//           <div
//             onMouseEnter={() => setActiveMenu("topdeals")}
//             onMouseLeave={() => setActiveMenu(null)}
//             className="flex items-center gap-2 hover:cursor-pointer"
//           >
//             <p>Top deals</p>
//             <MdKeyboardArrowDown />
//           </div>
//         </div>

//         {/* Today Sale Toggle */}
//         <div
//           className="hover:cursor-pointer flex items-center gap-1"
//           onClick={() => setIsSidebarOpen(true)}
//         >
//           <MdLocalOffer />
//           <h1>Today's Sale</h1>
//         </div>
//       </nav>

//       {/* ---------------------- CATEGORIES DROPDOWN ---------------------- */}
// {/* ---------------------- CATEGORIES DROPDOWN ---------------------- */}
// <AnimatePresence>
//   {activeMenu === "cat" && (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.25 }}
//       className="absolute top-full left-[180px] z-40"
//       onMouseEnter={() => setActiveMenu("cat")}
//       onMouseLeave={() => setActiveMenu(null)}
//     >
//       <div className="py-4 px-6 rounded-[6px] bg-white shadow-[0_0_25px_rgba(0,0,0,0.15)] w-auto">
//         {shopItems.map((section, index) => (
//           <div key={index}>
            
//             <h1 className="font-medium text-[17px] py-2 border-b border-gray-100 mb-2">
//               {section.title}
//             </h1>

//             <div className="flex flex-col gap-2">
//               {section.items.map((item, i) => (
//                 <p
//                   key={i}
//                   className="text-[18px] text-[#666] hover:text-[#E94A85] cursor-pointer"
//                 >
//                   {item}
//                 </p>
//               ))}
//             </div>

//           </div>
//         ))}
//       </div>
//     </motion.div>
//   )}
// </AnimatePresence>

//       {/* PRODUCTS DROPDOWN */}
//       <div
//         className="absolute left-0 right-0 flex justify-center top-full z-40"
//         onMouseEnter={() => setActiveMenu("product")}
//         onMouseLeave={() => setActiveMenu(null)}
//       >
//         <Product ShowDropdownforProducts={activeMenu === "product"} />
//       </div>

//       {/* TOP DEALS DROPDOWN */}
//       <div
//         className="absolute left-0 right-0 flex justify-center top-full z-40"
//         onMouseEnter={() => setActiveMenu("topdeals")}
//         onMouseLeave={() => setActiveMenu(null)}
//       >
//         <Topdeals showDropdownForTopDeals={activeMenu === "topdeals"} />
//       </div>

//       {/* TODAY'S SALE SIDEBAR */}
//       <TodaySaleSidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//       />
//     </div>
//   );
// };

// export default Navbar2;

import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Product from "../Products/Product";
import Topdeals from "../Top-Deals/topdeals";
import { Link, useNavigate } from "react-router-dom";
import TodaySaleSidebar from "./today-sale";
import { MdLocalOffer } from "react-icons/md";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Navbar2 = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories/get");
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };
    getCategories();
  }, []);

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    // Navigate to shop page with category ID in state
    navigate('/shop', { state: { selectedCategory: categoryId } });
    setActiveMenu(null);
  };

  return (
    <div className="hidden lg:block relative">
      <nav className="px-5 py-5 flex items-center justify-between text-[18px] bg-white relative z-0">
        <div className="flex items-center gap-12">
          
          {/* HOME */}
          <Link
            to="/"
            style={{ color: location.pathname === "/" ? "#E94A85" : "black" }}
          >
            <p>Home</p>
          </Link>

          {/* SHOP */}
          <Link
            to="/shop"
            style={{ color: location.pathname === "/shop" ? "#E94A85" : "black" }}
          >
            <p>Shop</p>
          </Link>

          {/* CATEGORIES */}
          <div
            className="flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setActiveMenu("cat")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <p>Categories</p>
            <div className="bg-[#199588] text-white text-[11px] px-1 rounded-[5px]">
              SALE
            </div>
            <MdKeyboardArrowDown />
          </div>

          {/* PRODUCTS */}
          <div
            className="flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setActiveMenu("product")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <p>Products</p>
            <MdKeyboardArrowDown />
          </div>

          {/* TOP DEALS */}
          <div
            onMouseEnter={() => setActiveMenu("topdeals")}
            onMouseLeave={() => setActiveMenu(null)}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <p>Top deals</p>
            <MdKeyboardArrowDown />
          </div>
        </div>

        {/* Today Sale Toggle */}
        <div
          className="hover:cursor-pointer flex items-center gap-1"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MdLocalOffer />
          <h1>Today's Sale</h1>
        </div>
      </nav>

      {/* ---------------------- CATEGORIES DROPDOWN ---------------------- */}
      <AnimatePresence>
        {activeMenu === "cat" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-[180px] z-40"
            onMouseEnter={() => setActiveMenu("cat")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="py-4 px-6 rounded-[6px] bg-white shadow-[0_0_25px_rgba(0,0,0,0.15)] w-auto">
              <h1 className="font-medium text-[17px] py-2 border-b border-gray-100 mb-2">
                Popular Categories
              </h1>

              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <p
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className="text-[18px] text-[#666] hover:text-[#E94A85] cursor-pointer"
                  >
                    {category.name}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCTS DROPDOWN */}
      <div
        className="absolute left-0 right-0 flex justify-center top-full z-40"
        onMouseEnter={() => setActiveMenu("product")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Product ShowDropdownforProducts={activeMenu === "product"} />
      </div>

      {/* TOP DEALS DROPDOWN */}
      <div
        className="absolute left-0 right-0 flex justify-center top-full z-40"
        onMouseEnter={() => setActiveMenu("topdeals")}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <Topdeals showDropdownForTopDeals={activeMenu === "topdeals"} />
      </div>

      {/* TODAY'S SALE SIDEBAR */}
      <TodaySaleSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default Navbar2;