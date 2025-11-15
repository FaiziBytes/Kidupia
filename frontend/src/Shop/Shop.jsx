// import React, { useState, useMemo } from 'react';
// import { Grid, List, ChevronDown, ChevronUp, Star, ShoppingCart, Menu, X } from 'lucide-react';
// import BreadcrumbBanner from '../components/breadcrumb';

// const ProductShop = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('default');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [expandedCategories, setExpandedCategories] = useState({
//     categories: true,
//     highlight: true
//   });
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedHighlight, setSelectedHighlight] = useState('all');

//   const categories = [
//     { id: 'kids-toys', name: 'Kids Toys', count: 4 },
//     { id: 'baby-clothe', name: 'Baby Kids Clothe', count: 13 },
//     { id: 'footwear', name: 'Footwear', count: 1 },
//     { id: 'gear-nursery', name: 'Gear & Nursery', count: 7 },
//     { id: 'health-safety', name: 'Health & Safety', count: 3 },
//     { id: 'bath-skin', name: 'Bath & Skin Care', count: 12 },
//     { id: 'kids-food', name: 'Kids Food', count: 2 }
//   ];

//   const highlights = [
//     { id: 'all', name: 'All Products' },
//     { id: 'best-seller', name: 'Best Seller' },
//     { id: 'new-arrivals', name: 'New Arrivals' },
//     { id: 'sale', name: 'Sale' }
//   ];

//   const products = [
//     {
//       id: 1,
//       name: 'Attractive Clog Shoes Indoor & Outdoor For Kids',
//       price: 12,
//       originalPrice: null,
//       discount: null,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop',
//       badge: null,
//       hasOptions: true,
//       category: 'footwear',
//       isBestSeller: true,
//       isNewArrival: false,
//       isOnSale: false
//     },
//     {
//       id: 2,
//       name: "Baby's First Blocks ABCD Learning Shapes",
//       price: 24,
//       originalPrice: null,
//       discount: null,
//       rating: 5,
//       image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
//       badge: null,
//       category: 'kids-toys',
//       isBestSeller: true,
//       isNewArrival: false,
//       isOnSale: false
//     },
//     {
//       id: 3,
//       name: 'Batman Lace Running Shoes For Boys & Girls',
//       price: 38,
//       originalPrice: 40,
//       discount: 5,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b843?w=400&h=400&fit=crop',
//       badge: '-5%',
//       countdown: { days: 374, hours: 18, minutes: 17, seconds: 28 },
//       category: 'footwear',
//       isBestSeller: false,
//       isNewArrival: false,
//       isOnSale: true
//     },
//     {
//       id: 4,
//       name: 'Cuddles - Super Pants Pant Style Diaper - M',
//       price: 18,
//       originalPrice: 20,
//       discount: 10,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop',
//       badge: '-10%',
//       category: 'bath-skin',
//       isBestSeller: false,
//       isNewArrival: false,
//       isOnSale: true
//     },
//     {
//       id: 5,
//       name: 'Organic Cotton Baby Romper Set',
//       price: 32,
//       originalPrice: null,
//       discount: null,
//       rating: 5,
//       image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
//       badge: null,
//       category: 'baby-clothe',
//       isBestSeller: false,
//       isNewArrival: true,
//       isOnSale: false
//     },
//     {
//       id: 6,
//       name: 'Educational Learning Tablet',
//       price: 45,
//       originalPrice: 50,
//       discount: 10,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
//       badge: '-10%',
//       category: 'kids-toys',
//       isBestSeller: false,
//       isNewArrival: true,
//       isOnSale: true
//     },
//     {
//       id: 7,
//       name: 'Soft Plush Teddy Bear',
//       price: 28,
//       originalPrice: 35,
//       discount: 20,
//       rating: 5,
//       image: 'https://images.unsplash.com/photo-1551361415-69c87624334f?w=400&h=400&fit=crop',
//       badge: '-20%',
//       category: 'kids-toys',
//       isBestSeller: true,
//       isNewArrival: false,
//       isOnSale: true
//     },
//     {
//       id: 8,
//       name: 'Kids Sports Water Bottle',
//       price: 15,
//       originalPrice: null,
//       discount: null,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
//       badge: null,
//       category: 'health-safety',
//       isBestSeller: false,
//       isNewArrival: true,
//       isOnSale: false
//     },
//     {
//       id: 9,
//       name: 'Colorful Building Blocks Set',
//       price: 42,
//       originalPrice: 48,
//       discount: 12,
//       rating: 5,
//       image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
//       badge: '-12%',
//       category: 'kids-toys',
//       isBestSeller: false,
//       isNewArrival: false,
//       isOnSale: true
//     },
//     {
//       id: 10,
//       name: 'Baby Musical Mobile',
//       price: 35,
//       originalPrice: null,
//       discount: null,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop',
//       badge: null,
//       category: 'gear-nursery',
//       isBestSeller: false,
//       isNewArrival: true,
//       isOnSale: false
//     },
//     {
//       id: 11,
//       name: 'Kids Garden Tool Set',
//       price: 22,
//       originalPrice: 28,
//       discount: 21,
//       rating: 4,
//       image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
//       badge: '-21%',
//       category: 'gear-nursery',
//       isBestSeller: false,
//       isNewArrival: false,
//       isOnSale: true
//     },
//     {
//       id: 12,
//       name: 'Wooden Puzzle Train',
//       price: 19,
//       originalPrice: null,
//       discount: null,
//       rating: 5,
//       image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
//       badge: null,
//       category: 'kids-toys',
//       isBestSeller: true,
//       isNewArrival: false,
//       isOnSale: false
//     }
//   ];

//   // Filter products based on selected filters
//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     // Filter by categories
//     if (selectedCategories.length > 0) {
//       filtered = filtered.filter(product => 
//         selectedCategories.includes(product.category)
//       );
//     }

//     // Filter by highlight
//     if (selectedHighlight !== 'all') {
//       filtered = filtered.filter(product => {
//         switch (selectedHighlight) {
//           case 'best-seller':
//             return product.isBestSeller;
//           case 'new-arrivals':
//             return product.isNewArrival;
//           case 'sale':
//             return product.isOnSale;
//           default:
//             return true;
//         }
//       });
//     }

//     return filtered;
//   }, [selectedCategories, selectedHighlight]);

//   // Sort filtered products
//   const sortedProducts = useMemo(() => {
//     let sorted = [...filteredProducts];
//     switch (sortBy) {
//       case 'price-low':
//         return sorted.sort((a, b) => a.price - b.price);
//       case 'price-high':
//         return sorted.sort((a, b) => b.price - a.price);
//       case 'rating':
//         return sorted.sort((a, b) => b.rating - a.rating);
//       case 'name':
//         return sorted.sort((a, b) => a.name.localeCompare(b.name));
//       default:
//         return sorted;
//     }
//   }, [filteredProducts, sortBy]);

//   const toggleCategory = (category) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [category]: !prev[category]
//     }));
//   };

//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategories(prev => {
//       if (prev.includes(categoryId)) {
//         return prev.filter(id => id !== categoryId);
//       } else {
//         return [...prev, categoryId];
//       }
//     });
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
//       />
//     ));
//   };

//   const SidebarContent = () => (
//     <>
//       {/* Categories */}
//       <div className="bg-white rounded-lg shadow-sm mb-6">
//         <button
//           onClick={() => toggleCategory('categories')}
//           className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50"
//         >
//           <span>Shop By Categories</span>
//           {expandedCategories.categories ? (
//             <ChevronUp className="w-5 h-5" />
//           ) : (
//             <ChevronDown className="w-5 h-5" />
//           )}
//         </button>
//         {expandedCategories.categories && (
//           <div className="px-4 pb-4 space-y-2">
//             {categories.map(cat => (
//               <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(cat.id)}
//                   className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
//                   onChange={() => handleCategoryChange(cat.id)}
//                 />
//                 <span className="text-gray-700 group-hover:text-pink-500">
//                   {cat.name} <span className="text-gray-400">({cat.count})</span>
//                 </span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Highlight */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <button
//           onClick={() => toggleCategory('highlight')}
//           className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50"
//         >
//           <span>Highlight</span>
//           {expandedCategories.highlight ? (
//             <ChevronUp className="w-5 h-5" />
//           ) : (
//             <ChevronDown className="w-5 h-5" />
//           )}
//         </button>
//         {expandedCategories.highlight && (
//           <div className="px-4 pb-4 space-y-2">
//             {highlights.map(h => (
//               <button
//                 key={h.id}
//                 onClick={() => {
//                   setSelectedHighlight(h.id);
//                   if (window.innerWidth < 1024) setSidebarOpen(false);
//                 }}
//                 className={`w-full text-left px-3 py-2 rounded transition-colors ${
//                   selectedHighlight === h.id
//                     ? 'bg-pink-500 text-white'
//                     : 'hover:bg-pink-50 hover:text-pink-500 text-gray-700'
//                 }`}
//               >
//                 {h.name}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <BreadcrumbBanner/>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
//         <div className="flex gap-4 lg:gap-8">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block w-64 flex-shrink-0">
//             <SidebarContent />
//           </aside>

//           {/* Mobile Sidebar */}
//           {sidebarOpen && (
//             <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
//               <div className="bg-white w-80 max-w-[85vw] h-full overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-semibold">Filters</h2>
//                   <button onClick={() => setSidebarOpen(false)}>
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//                 <SidebarContent />
//               </div>
//             </div>
//           )}

//           {/* Main Content */}
//           <main className="flex-1 min-w-0">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden p-2 bg-white rounded-lg shadow-sm"
//                 >
//                   <Menu className="w-5 h-5" />
//                 </button>
//                 <p className="text-sm sm:text-base text-gray-600">
//                   Showing <span className="font-semibold">1–{sortedProducts.length}</span> of <span className="font-semibold">{sortedProducts.length}</span> results
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 sm:gap-4">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="flex-1 sm:flex-none text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
//                 >
//                   <option value="default">Default sorting</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="rating">Highest Rated</option>
//                   <option value="name">Name: A to Z</option>
//                 </select>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setViewMode('grid')}
//                     className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
//                   >
//                     <Grid className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode('list')}
//                     className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
//                   >
//                     <List className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Products Grid */}
//             {sortedProducts.length === 0 ? (
//               <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//                 <p className="text-gray-500 text-lg">No products found matching your filters.</p>
//                 <button
//                   onClick={() => {
//                     setSelectedCategories([]);
//                     setSelectedHighlight('all');
//                   }}
//                   className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             ) : (
//               <div className={`grid gap-4 sm:gap-6 ${
//                 viewMode === 'grid' 
//                   ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
//                   : 'grid-cols-1'
//               }`}>
//                 {sortedProducts.map(product => (
//                   <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
//                     <div className="relative overflow-hidden">
//                       {product.badge && (
//                         <span className="absolute top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
//                           {product.badge}
//                         </span>
//                       )}
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
//                       />
//                       {product.countdown && (
//                         <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-2 rounded-lg">
//                           <div className="flex gap-2 text-xs font-semibold">
//                             <span className="text-pink-500">{product.countdown.days}d</span>
//                             <span className="text-gray-400">:</span>
//                             <span className="text-pink-500">{product.countdown.hours}h</span>
//                             <span className="text-gray-400">:</span>
//                             <span className="text-pink-500">{product.countdown.minutes}m</span>
//                             <span className="text-gray-400">:</span>
//                             <span className="text-pink-500">{product.countdown.seconds}s</span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-4">
//                       <h3 className="text-gray-800 font-medium mb-2 line-clamp-2 min-h-[3rem]">
//                         {product.name}
//                       </h3>

//                       <div className="flex items-center mb-3">
//                         {renderStars(product.rating)}
//                       </div>

//                       <div className="flex items-center gap-2 mb-4">
//                         {product.originalPrice && (
//                           <span className="text-gray-400 line-through text-sm sm:text-base">${product.originalPrice}</span>
//                         )}
//                         <span className="text-xl sm:text-2xl font-bold text-pink-500">${product.price}</span>
//                       </div>

//                       {product.hasOptions ? (
//                         <button className="w-full bg-gray-100 text-gray-700 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base">
//                           SELECT
//                         </button>
//                       ) : (
//                         <button className="w-full bg-pink-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
//                           <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
//                           ADD TO CART
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {sortedProducts.length > 0 && (
//               <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
//                 <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
//                   Previous
//                 </button>
//                 <button className="px-3 sm:px-4 py-2 bg-pink-500 text-white rounded-lg text-sm sm:text-base">1</button>
//                 <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base">2</button>
//                 <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base">
//                   Next
//                 </button>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductShop;


import React, { useEffect } from 'react'
import BreadcrumbBanner from '../components/breadcrumb.jsx'
import { useState } from 'react';
import axios from 'axios';
import { ChevronUp, ChevronDown } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { BsGrid3X3Gap } from "react-icons/bs";


const Shop = () => {
  const [open, setOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [priceSectionOpen, setPriceSectionOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [gridView, setGridView] = useState(true);
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
      console.log(response.data);
      setCategories(response.data.categories);
    } catch (error) {

    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products/");
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {

    }
  }
  useEffect(() => {
    getCategories();
    fetchProducts();
  }, [])
  return (
    <div>
      <BreadcrumbBanner />
      <div className='py-12 px-3 flex'>
        <div className='w-[22%]'>
          <div className="w-[100%] bg-white rounded-[10px] shadow-sm border border-gray-200">
            {/* Header */}
            <button
              onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              <span>Shop By Categories</span>
              {open ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Category List */}
            {open && (
              <div className="p-4 space-y-4">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                      onChange={() => onChange?.(cat.id)}
                    />

                    <span className="text-gray-700 group-hover:text-pink-500 transition">
                      {cat.name}{" "}
                      <span className="text-gray-400">({cat.count})</span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border my-5 border-gray-200">
            {/* Header */}
            <button
              onClick={() => setPriceSectionOpen(!priceSectionOpen)}
              className="w-full flex items-center justify-between p-4 text-lg font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              <span>Price Filter</span>
              {priceSectionOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-200 " />

            {/* Price List */}
            {priceSectionOpen && (
              <div className="p-4 space-y-3">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => onChange?.(range.id)}
                    className={`block w-full text-left text-gray-700 hover:text-pink-500 transition ${selected === range.id ? "text-pink-500 font-medium" : ""
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/*  */}
        <div className='w-[78%] px-5'>
          <div className='flex items-center justify-between'>
            <h1>Showing 1–12 of 24 results</h1>
            <div className='flex items-center gap-1'>
              <select className='ml-5 border px-3 py-2 rounded-lg'>
                <option value="default">Default sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name: A to Z</option>
              </select>
              <div
                className='flex items-center px-1 py-1 rounded-[5px]'
                onClick={()=> setGridView(true)}
                style={{
                  backgroundColor: gridView ? "#E84A84" : "white",
                  color: gridView ? "white" : "black"
                }}
              >
                < BsGrid3X3Gap className="inline-block" size={20} />
              </div>
              <div
              className='flex items-center py-1 px-1 rounded-[5px]'
              onClick={()=> setGridView(false)}
                style={{
                  backgroundColor: gridView ? "white" : "#E84A84",
                  color: gridView ? "black" : "white"
                }}
              >
                <IoMenu className="inline-block" size={23} />
              </div>

            </div>
          </div>


          <div className='grid grid-cols-4 py-5 gap-7'>
            {
              products?.map((product) => {
                return <div className='border-1 pb-3 border-[#E5E5E5] p-2 rounded-[5px]'>
                  <img
                    src={product.images[0]} alt="" className='overflow-hidden' />
                  <div className='px-2 flex flex-col gap-1'>
                    <h2
                    className='product-title line-clamp-2'
                    >{product.title}</h2>
                    <div className='text-[18px] flex tracking-wider text-[#FFAB00] font-extrabold'>
                      ★★★★★
                    </div>
                    <button
                      className='text-[14px] bg-[#F0F0F0] text-black py-2 w-[100%] font-medium'
                    >ADD TO CART</button>
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop