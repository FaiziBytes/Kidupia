// import { MdKeyboardArrowDown } from "react-icons/md";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Product from "../Products/Product";
// import Topdeals from "../Top-Deals/topdeals";
// import { Link } from "react-router-dom";


// const Navbar2 = () => {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [color,setColor] = useState("black")
//   const shopItems = [
//     {
//       title: "Product Types",
//       items: [
//         "Simple Product",
//         "Grouped Product",
//         "Variable Product",
//         "External/Affiliate Product",
//         "Sale Product",
//         "Upsell Products",
//         "Cross-Sell Product",
//       ],
//     },
//     {
//       title: "WooCommerce Pages",
//       items: [
//         "Shop Page",
//         "Shopping Cart",
//         "Checkout Page",
//         "My account",
//         "Shop Ajax Filter",
//         "Product Category",
//         "Privacy Policy",
//       ],
//     },
//     {
//       title: "Product Features",
//       items: [
//         "Stock Progress Bar",
//         "Color/Image Swatches",
//         "Size Guide Table",
//         "Custom Tab",
//         "Countdown Timer",
//         "Product Video",
//         "Product Brand",
//       ],
//     },
//   ];

//   return (
//     <div className="hidden lg:block relative">
//       {/* 🔹 Navbar Header */}
//       <nav className="px-5 py-5 flex items-center justify-between text-[18px] bg-white relative z-50">
//         <div className="flex items-center gap-12">
//           <Link to="/"><p 
//           style={{color:color}}
//           onClick={()=> setColor("blue")}
//           >Home</p></Link>

//           {/* Shop */}
//           <Link to="Home/Shop">
//             <div
//               className="hover:cursor-pointer ">
//               <p>Shop</p>
//             </div>
//           </Link>
//           {/* Categories */}
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

//           {/* Products */}
//           <div
//             className="flex items-center gap-1 cursor-pointer relative"
//             onMouseEnter={() => setActiveMenu("product")}
//             onMouseLeave={() => setActiveMenu(null)}
//           >
//             <p>Products</p>
//             <MdKeyboardArrowDown />
//           </div>
//           <div onMouseEnter={() => setActiveMenu("topdeals")}
//             onMouseLeave={() => setActiveMenu(null)}
//             className="flex items-center gap-2 hover:cursor-pointer hover:transition-all">
//             <p>Top deals</p>
//             <MdKeyboardArrowDown />
//           </div>
//         </div>

//         <div>
//           <h1>Today's Sale</h1>
//         </div>
//       </nav>


//       {/* 🔹 CATEGORIES Dropdown */}
//       <AnimatePresence>
//         {activeMenu === "cat" && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.25 }}
//             className="absolute left-0 right-0 flex justify-center top-full z-40"
//             onMouseEnter={() => setActiveMenu("cat")}
//             onMouseLeave={() => setActiveMenu(null)}
//           >
//             <div className="py-5 px-8 rounded-[4px] flex w-[98%] bg-white shadow-[0_0_25px_rgba(0,0,0,0.15)]">
//               {shopItems.map((section, index) => (
//                 <div key={index} className="w-[23%] px-3">
//                   <h1 className="font-medium text-[18px] py-1 border-b border-gray-100 mb-2">
//                     {section.title}
//                   </h1>
//                   {section.items.map((item, i) => (
//                     <h1
//                       key={i}
//                       className="py-1 text-[16px] text-[#666666] hover:text-[#E94A85] cursor-pointer transition-colors"
//                     >
//                       {item}
//                     </h1>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 🔹 PRODUCTS Dropdown */}
//       <div
//         className="absolute left-0 right-0 flex justify-center top-full z-40"
//         onMouseEnter={() => setActiveMenu("product")}
//         onMouseLeave={() => setActiveMenu(null)}
//       >
//         <Product ShowDropdownforProducts={activeMenu === "product"} />
//       </div>

//       {/* {top deals dropdown} */}

//       <div className="absolute left-0 right-0 flex justify-center top-full z-40"
//         onMouseEnter={() => setActiveMenu("topdeals")}
//         onMouseLeave={() => setActiveMenu(null)}>
//         <Topdeals showDropdownForTopDeals={activeMenu === "topdeals"} />
//       </div>
//     </div>
//   );
// };

// export default Navbar2;

import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Product from "../Products/Product";
import Topdeals from "../Top-Deals/topdeals";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("home"); // 👈 keeps track of which link is active

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
      <nav className="px-5 py-5 flex items-center justify-between text-[18px] bg-white relative z-50">
        <div className="flex items-center gap-12">
          {/* 🏠 Home */}
          <Link to="/">
            <p
              style={{
                color: selectedMenu === "home" ? "#E94A85" : "black",
              }}
              onClick={() => setSelectedMenu("home")}
            >
              Home
            </p>
          </Link>

          {/* 🛒 Shop */}
          <Link to="Home/Shop">
            <p
              style={{
                color: selectedMenu === "shop" ? "#E94A85" : "black",
              }}
              onClick={() => setSelectedMenu("shop")}
            >
              Shop
            </p>
          </Link>

          {/* 🧭 Categories */}
          <div
            className="flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setActiveMenu("cat")}
            onMouseLeave={() => setActiveMenu(null)}
            onClick={() => setSelectedMenu("categories")}
          >
            <p
              style={{
                color: selectedMenu === "categories" ? "#E94A85" : "black",
              }}
            >
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
            onClick={() => setSelectedMenu("products")}
          >
            <p
              style={{
                color: selectedMenu === "products" ? "#E94A85" : "black",
              }}
            >
              Products
            </p>
            <MdKeyboardArrowDown />
          </div>

          {/* 💎 Top Deals */}
          <div
            onMouseEnter={() => setActiveMenu("topdeals")}
            onMouseLeave={() => setActiveMenu(null)}
            onClick={() => setSelectedMenu("topdeals")}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <p
              style={{
                color: selectedMenu === "topdeals" ? "#E94A85" : "black",
              }}
            >
              Top deals
            </p>
            <MdKeyboardArrowDown />
          </div>
        </div>

        <div>
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
    </div>
  );
};

export default Navbar2;
