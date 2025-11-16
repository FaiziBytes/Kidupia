// import React, { useEffect, useState } from 'react'
// import BreadcrumbBanner from '../components/breadcrumb.jsx'
// import axios from 'axios';
// import { ChevronUp, ChevronDown } from "lucide-react";
// import { IoMenu } from "react-icons/io5";
// import { BsGrid3X3Gap } from "react-icons/bs";

// const Shop = () => {
//   const [open, setOpen] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
//   const [selectedPrice, setSelectedPrice] = useState("all");
//   const [priceSectionOpen, setPriceSectionOpen] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [gridView, setGridView] = useState(true);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);

//   const priceRanges = [
//     { id: "all", label: "All" },
//     { id: "0-20", label: "$0–$20" },
//     { id: "20-40", label: "$20–$40" },
//     { id: "40-60", label: "$40–$60" },
//     { id: "60+", label: "$60+" }
//   ];

//   const getCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/categories/get");
//       setCategories(response.data.categories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/products/");
//       setProducts(response.data.products);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//     fetchProducts();
//   }, []);

//   // Handle category checkbox toggle
//   const handleCategoryToggle = (categoryId) => {
//     setSelectedCategories(prev => {
//       if (prev.includes(categoryId)) {
//         return prev.filter(id => id !== categoryId);
//       } else {
//         return [...prev, categoryId];
//       }
//     });
//     setCurrentPage(1); // Reset to first page when filter changes
//   };

//   // Filter by category
//   const filterByCategory = (productsList) => {
//     if (selectedCategories.length === 0) return productsList;
//     return productsList.filter(product => 
//       selectedCategories.includes(product.category)
//     );
//   };

//   // Filter by price
//   const filterByPrice = (productsList) => {
//     if (selectedPrice === "all") return productsList;

//     if (selectedPrice === "0-20")
//       return productsList.filter((p) => p.price >= 0 && p.price <= 20);

//     if (selectedPrice === "20-40")
//       return productsList.filter((p) => p.price >= 20 && p.price <= 40);

//     if (selectedPrice === "40-60")
//       return productsList.filter((p) => p.price >= 40 && p.price <= 60);

//     if (selectedPrice === "60+")
//       return productsList.filter((p) => p.price >= 60);

//     return productsList;
//   };

//   // Apply both filters
//   const filteredProducts = filterByPrice(filterByCategory(products));

//   // Pagination calculations
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div>
//       <BreadcrumbBanner />
//       <div className='py-12 px-3 flex'>
//         <div className='w-[22%]'>

//           {/* CATEGORY BOX */}
//           <div className="w-[100%] bg-white rounded-[10px] shadow-sm border border-gray-200">
//             <button
//               onClick={() => setOpen(!open)}
//               className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
//             >
//               <span>Shop By Categories</span>
//               {open ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
//             </button>

//             <div className="border-t border-gray-200" />

//             {open && (
//               <div className="p-4 space-y-4">
//                 {categories.map((cat) => (
//                   <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
//                     <input
//                       type="checkbox"
//                       checked={selectedCategories.includes(cat._id)}
//                       onChange={() => handleCategoryToggle(cat._id)}
//                       className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
//                     />
//                     <span className="text-gray-700 group-hover:text-pink-500 transition">
//                       {cat.name} <span className="text-gray-400">
//                         ({products.filter(p => p.category === cat._id).length})
//                       </span>
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* PRICE FILTER */}
//           <div className="bg-white rounded-xl shadow-sm border my-5 border-gray-200">
//             <button
//               onClick={() => setPriceSectionOpen(!priceSectionOpen)}
//               className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
//             >
//               <span>Price Filter</span>
//               {priceSectionOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
//             </button>

//             <div className="border-t border-gray-200" />

//             {priceSectionOpen && (
//               <div className="p-4 space-y-3">
//                 {priceRanges.map((range) => (
//                   <button
//                     key={range.id}
//                     onClick={() => {
//                       setSelectedPrice(range.id);
//                       setCurrentPage(1);
//                     }}
//                     className={`block w-full text-left text-gray-700 hover:text-pink-500 transition ${
//                       selectedPrice === range.id ? "text-pink-500 font-medium" : ""
//                     }`}
//                   >
//                     {range.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>

//         {/* PRODUCTS RIGHT SIDE */}
//         <div className='w-[78%] px-5'>
//           <div className='flex items-center justify-between'>
//             <h1>
//               Showing {filteredProducts.length === 0 ? 0 : indexOfFirstItem + 1}–
//               {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results
//             </h1>

//             <div className='flex items-center gap-1'>
//               <select className='ml-5 border px-3 py-2 rounded-lg'>
//                 <option value="default">Default sorting</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Highest Rated</option>
//                 <option value="name">Name: A to Z</option>
//               </select>

//               <div
//                 className='flex items-center px-1 py-1 rounded-[5px] cursor-pointer'
//                 onClick={() => setGridView(true)}
//                 style={{ backgroundColor: gridView ? "#E84A84" : "white", color: gridView ? "white" : "black" }}
//               >
//                 <BsGrid3X3Gap size={20} />
//               </div>

//               <div
//                 className='flex items-center px-1 py-1 rounded-[5px] cursor-pointer'
//                 onClick={() => setGridView(false)}
//                 style={{ backgroundColor: gridView ? "white" : "#E84A84", color: gridView ? "black" : "white" }}
//               >
//                 <IoMenu size={23} />
//               </div>
//             </div>
//           </div>

//           {/* PRODUCT GRID */}
//           <div className='grid grid-cols-4 py-5 gap-7'>
//             {currentProducts.map((product) => (
//               <div key={product._id} className='border-1 pb-3 border-[#E5E5E5] p-2 rounded-[5px]'>
//                 <img src={product.images[0]} alt={product.title} className='overflow-hidden' />
//                 <div className='px-2 flex flex-col gap-1'>
//                   <h2 className='product-title line-clamp-2'>{product.title}</h2>
//                   <div className='text-[18px] flex tracking-wider text-[#FFAB00] font-extrabold'>★★★★★</div>
//                   <h1 className='font-bold text-[20px] text-[#E94A85]'>${product.price}</h1>
//                   <button className='text-[14px] bg-[#F0F0F0] text-black py-2 w-[100%] font-medium'>
//                     ADD TO CART
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* No results message */}
//           {filteredProducts.length === 0 && (
//             <div className='text-center py-10'>
//               <p className='text-gray-500 text-lg'>No products found matching your filters.</p>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* PAGINATION */}
//       {totalPages > 0 && (
//         <div className="flex justify-center items-center gap-3 mt-6 mb-10">
//           <button
//             onClick={() =>{ currentPage > 1 && handlePageChange(currentPage - 1)
//                window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Previous
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => handlePageChange(i + 1)}
//               className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-pink-500 text-white" : ""}`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => {
//               currentPage < totalPages && handlePageChange(currentPage + 1);
//                window.scrollTo({ top: 0, behavior: "smooth" });
//             }}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react'
import BreadcrumbBanner from '../components/breadcrumb.jsx'
import axios from 'axios';
import { ChevronUp, ChevronDown } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { BsGrid3X3Gap } from "react-icons/bs";

const Shop = () => {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [priceSectionOpen, setPriceSectionOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [gridView, setGridView] = useState(true);
  const [addingToCart, setAddingToCart] = useState({}); // Track loading state per product

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Get userId from user object stored in localStorage
  const getUserId = () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        return userObj._id;
      }
      return null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  };
  
  const userId = getUserId();

  const priceRanges = [
    { id: "all", label: "All" },
    { id: "0-20", label: "$0–$20" },
    { id: "20-40", label: "$20–$40" },
    { id: "40-60", label: "$40–$60" },
    { id: "60+", label: "$60+" }
  ];

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories/get");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products/");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getCategories();
    fetchProducts();
  }, []);

  // Handle category checkbox toggle
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Filter by category
  const filterByCategory = (productsList) => {
    if (selectedCategories.length === 0) return productsList;
    return productsList.filter(product => 
      selectedCategories.includes(product.category)
    );
  };

  // Filter by price
  const filterByPrice = (productsList) => {
    if (selectedPrice === "all") return productsList;

    if (selectedPrice === "0-20")
      return productsList.filter((p) => p.price >= 0 && p.price <= 20);

    if (selectedPrice === "20-40")
      return productsList.filter((p) => p.price >= 20 && p.price <= 40);

    if (selectedPrice === "40-60")
      return productsList.filter((p) => p.price >= 40 && p.price <= 60);

    if (selectedPrice === "60+")
      return productsList.filter((p) => p.price >= 60);

    return productsList;
  };

  // Apply both filters
  const filteredProducts = filterByPrice(filterByCategory(products));

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add to cart handler
  const handleAddToCart = async (product) => {
    if (!userId) {
      alert('Please login to add items to cart');
      return;
    }

    setAddingToCart(prev => ({ ...prev, [product._id]: true }));

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:3000/api/cart/add', 
        {
          userId: userId,
          productId: product._id,
          quantity: 1,
          variantAttributes: {} // Add variant logic if needed
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Product added to cart successfully!');
        // Optionally update cart count in header/navbar
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.response?.data?.message || 'Failed to add product to cart');
    } finally {
      setAddingToCart(prev => ({ ...prev, [product._id]: false }));
    }
  };

  return (
    <div>
      <BreadcrumbBanner />
      <div className='py-12 px-3 flex'>
        <div className='w-[22%]'>

          {/* CATEGORY BOX */}
          <div className="w-[100%] bg-white rounded-[10px] shadow-sm border border-gray-200">
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              <span>Shop By Categories</span>
              {open ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
            </button>

            <div className="border-t border-gray-200" />

            {open && (
              <div className="p-4 space-y-4">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => handleCategoryToggle(cat._id)}
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                    />
                    <span className="text-gray-700 group-hover:text-pink-500 transition">
                      {cat.name} <span className="text-gray-400">
                        ({products.filter(p => p.category === cat._id).length})
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* PRICE FILTER */}
          <div className="bg-white rounded-xl shadow-sm border my-5 border-gray-200">
            <button
              onClick={() => setPriceSectionOpen(!priceSectionOpen)}
              className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              <span>Price Filter</span>
              {priceSectionOpen ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
            </button>

            <div className="border-t border-gray-200" />

            {priceSectionOpen && (
              <div className="p-4 space-y-3">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      setSelectedPrice(range.id);
                      setCurrentPage(1);
                    }}
                    className={`block w-full text-left text-gray-700 hover:text-pink-500 transition ${
                      selectedPrice === range.id ? "text-pink-500 font-medium" : ""
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* PRODUCTS RIGHT SIDE */}
        <div className='w-[78%] px-5'>
          <div className='flex items-center justify-between'>
            <h1>
              Showing {filteredProducts.length === 0 ? 0 : indexOfFirstItem + 1}–
              {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results
            </h1>

            <div className='flex items-center gap-1'>
              <select className='ml-5 border px-3 py-2 rounded-lg'>
                <option value="default">Default sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>

              <div
                className='flex items-center px-1 py-1 rounded-[5px] cursor-pointer'
                onClick={() => setGridView(true)}
                style={{ backgroundColor: gridView ? "#E84A84" : "white", color: gridView ? "white" : "black" }}
              >
                <BsGrid3X3Gap size={20} />
              </div>

              <div
                className='flex items-center px-1 py-1 rounded-[5px] cursor-pointer'
                onClick={() => setGridView(false)}
                style={{ backgroundColor: gridView ? "white" : "#E84A84", color: gridView ? "black" : "white" }}
              >
                <IoMenu size={23} />
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className='grid grid-cols-4 py-5 gap-7'>
            {currentProducts.map((product) => (
              <div key={product._id} className='border-1 pb-3 border-[#E5E5E5] p-2 rounded-[5px]'>
                <img src={product.images[0]} alt={product.title} className='overflow-hidden' />
                <div className='px-2 flex flex-col gap-1'>
                  <h2 className='product-title line-clamp-2'>{product.title}</h2>
                  <div className='text-[18px] flex tracking-wider text-[#FFAB00] font-extrabold'>★★★★★</div>
                  <h1 className='font-bold text-[20px] text-[#E94A85]'>${product.price}</h1>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart[product._id]}
                    className='text-[14px] bg-[#F0F0F0] text-black py-2 w-[100%] font-medium hover:bg-[#E84A84] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {addingToCart[product._id] ? 'ADDING...' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredProducts.length === 0 && (
            <div className='text-center py-10'>
              <p className='text-gray-500 text-lg'>No products found matching your filters.</p>
            </div>
          )}

        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-3 mt-6 mb-10">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-pink-500 text-white" : ""}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;