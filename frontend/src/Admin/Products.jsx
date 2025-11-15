// import React, { useState, useEffect } from "react";
// import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { debounce } from "lodash";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from backend
//   const fetchProducts = async (searchTerm = "") => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get("http://localhost:3000/api/products/", {
//         params: { search: searchTerm },
//       });
//       console.log(res.data);
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products.");
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/api/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product.");
//     }
//   };

//   // Safe filtering using title instead of name
//   const filteredProducts = products.filter((p) =>
//     (p?.title || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Debounced search
//   const handleSearchChange = debounce(async (value) => {
//     setSearch(value);
//     fetchProducts(value);
//   }, 500);

//   if (loading) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         <h2>{error}</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <FaBox /> Products Management
//         </h1>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={(e) => handleSearchChange(e.target.value)}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <Link to="/admin/add/product">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               <FaPlus /> Add Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white border rounded shadow">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Title</th>
//               <th className="py-2 px-4 border">Price</th>
//               <th className="py-2 px-4 border">Category</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((prod) => (
//                 <tr key={prod._id} className="text-gray-700 hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{prod._id}</td>
//                   <td className="py-2 px-4 border">{prod.title}</td>
//                   <td className="py-2 px-4 border">${prod.price}</td>
//                   <td className="py-2 px-4 border">{prod.category}</td>

//                   <td className="py-2 px-4 border flex gap-2">
//                     <Link to={`/admin/edit/product/${prod._id}`}>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>
//                     </Link>

//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(prod._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;


// import React, { useState, useEffect, useCallback } from "react";
// import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { debounce } from "lodash";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from backend
//   const fetchProducts = async (searchTerm = "") => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get("http://localhost:3000/api/products/", {
//         params: { search: searchTerm },
//       });
//       console.log(res.data);
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products.");
//     }

//     setLoading(false);
//   };

//   // Create debounced fetch function that persists across renders
//   const debouncedFetch = useCallback(
//     debounce(async (searchTerm) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get("http://localhost:3000/api/products/", {
//           params: { search: searchTerm },
//         });
//         console.log(res.data);
//         setProducts(res.data.products);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products.");
//       }
//       setLoading(false);
//     }, 500),
//     []
//   );

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Cleanup debounced function on unmount
//   useEffect(() => {
//     return () => {
//       debouncedFetch.cancel();
//     };
//   }, [debouncedFetch]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/api/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product.");
//     }
//   };

//   // Handle search - update state immediately, debounce API call
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value); // Update input immediately for instant feedback
//     debouncedFetch(value); // Debounce the API call
//   };

//   if (loading && products.length === 0) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         Loading products...
//       </div>
//     );
//   }

//   if (error && products.length === 0) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         <h2>{error}</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <FaBox /> Products Management
//         </h1>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleSearchChange}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <Link to="/admin/add/product">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               <FaPlus /> Add Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Loading indicator during search */}
//       {loading && products.length > 0 && (
//         <div className="text-center text-gray-500 mb-4">
//           Searching...
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white border rounded shadow">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Title</th>
//               <th className="py-2 px-4 border">Price</th>
//               <th className="py-2 px-4 border">Category</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length > 0 ? (
//               products.map((prod) => (
//                 <tr key={prod._id} className="text-gray-700 hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{prod._id}</td>
//                   <td className="py-2 px-4 border">{prod.title}</td>
//                   <td className="py-2 px-4 border">${prod.price}</td>
//                   <td className="py-2 px-4 border">{prod.category}</td>

//                   <td className="py-2 px-4 border flex gap-2">
//                     <Link to={`/admin/edit/product/${prod._id}`}>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>
//                     </Link>

//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(prod._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { debounce } from "lodash";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from backend
//   const fetchProducts = async (searchTerm = "") => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get("http://localhost:3000/api/products/", {
//         params: { search: searchTerm },
//       });
//       console.log(res.data);
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products.");
//     }

//     setLoading(false);
//   };

//   // Create debounced function using useRef to persist across renders
//   const debouncedFetchRef = useRef(
//     debounce(async (searchTerm) => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get("http://localhost:3000/api/products/", {
//           params: { search: searchTerm },
//         });
//         console.log(res.data);
//         setProducts(res.data.products);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load products.");
//       }
//       setLoading(false);
//     }, 500)
//   ).current;

//   useEffect(() => {
//     fetchProducts();
    
//     // Cleanup debounced function on unmount
//     return () => {
//       debouncedFetchRef.cancel();
//     };
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/api/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product.");
//     }
//   };

//   // Handle search - update state immediately, debounce API call
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value); // Update input immediately for instant feedback
//     debouncedFetchRef(value); // Debounce the API call
//   };

//   if (loading && products.length === 0) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         Loading products...
//       </div>
//     );
//   }

//   if (error && products.length === 0) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         <h2>{error}</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <FaBox /> Products Management
//         </h1>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleSearchChange}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <Link to="/admin/add/product">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               <FaPlus /> Add Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Loading indicator during search */}
//       {loading && products.length > 0 && (
//         <div className="text-center text-gray-500 mb-4">
//           Searching...
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white border rounded shadow">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Title</th>
//               <th className="py-2 px-4 border">Price</th>
//               <th className="py-2 px-4 border">Category</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length > 0 ? (
//               products.map((prod) => (
//                 <tr key={prod._id} className="text-gray-700 hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{prod._id}</td>
//                   <td className="py-2 px-4 border">{prod.title}</td>
//                   <td className="py-2 px-4 border">${prod.price}</td>
//                   <td className="py-2 px-4 border">{prod.category}</td>

//                   <td className="py-2 px-4 border flex gap-2">
//                     <Link to={`/admin/edit/product/${prod._id}`}>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>
//                     </Link>

//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(prod._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;













// import React, { useState, useEffect, useMemo } from "react";
// import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { debounce } from "lodash";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from backend
//   const fetchProducts = async (searchTerm = "") => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get("http://localhost:3000/api/products/", {
//         params: { search: searchTerm },
//       });
//       console.log(res.data);
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products.");
//     }

//     setLoading(false);
//   };

//   // Create debounced search function with useMemo
//   const debouncedSearch = useMemo(
//     () =>
//       debounce((searchTerm) => {
//         fetchProducts(searchTerm);
//       }, 500),
//     []
//   );

//   useEffect(() => {
//     fetchProducts();
    
//     // Cleanup
//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, [debouncedSearch]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/api/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product.");
//     }
//   };

//   // Handle search - update state immediately, debounce API call
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     debouncedSearch(value);
//   };

//   if (loading && products.length === 0) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         Loading products...
//       </div>
//     );
//   }

//   if (error && products.length === 0) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         <h2>{error}</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <FaBox /> Products Management
//         </h1>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleSearchChange}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <Link to="/admin/add/product">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               <FaPlus /> Add Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Loading indicator during search */}
//       {loading && products.length > 0 && (
//         <div className="text-center text-gray-500 mb-4">
//           Searching...
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white border rounded shadow">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Title</th>
//               <th className="py-2 px-4 border">Price</th>
//               <th className="py-2 px-4 border">Category</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length > 0 ? (
//               products.map((prod) => (
//                 <tr key={prod._id} className="text-gray-700 hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{prod._id}</td>
//                   <td className="py-2 px-4 border">{prod.title}</td>
//                   <td className="py-2 px-4 border">${prod.price}</td>
//                   <td className="py-2 px-4 border">{prod.category}</td>

//                   <td className="py-2 px-4 border flex gap-2">
//                     <Link to={`/admin/edit/product/${prod._id}`}>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>
//                     </Link>

//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(prod._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;


// import React, { useState, useEffect } from "react";
// import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch products from backend
//   const fetchProducts = async (searchTerm = "") => {
//     console.log("Fetching products with search term:", searchTerm);
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get("http://localhost:3000/api/products/", {
//         params: { search: searchTerm },
//       });
//       console.log("API Response:", res.data);
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error("API Error:", err);
//       setError("Failed to load products.");
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Debounce implementation without lodash dependency issues
//   useEffect(() => {
//     console.log("Search changed to:", search);
//     const timer = setTimeout(() => {
//       console.log("Executing search after debounce:", search);
//       fetchProducts(search);
//     }, 500);

//     return () => {
//       console.log("Clearing timer");
//       clearTimeout(timer);
//     };
//   }, [search]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       await axios.delete(`http://localhost:3000/api/products/${id}`);
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product.");
//     }
//   };

//   // Handle search - just update state
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     console.log("Input changed to:", value);
//     setSearch(value);
//   };

//   if (loading && products.length === 0) {
//     return (
//       <div className="p-6 flex justify-center items-center min-h-screen">
//         Loading products...
//       </div>
//     );
//   }

//   if (error && products.length === 0) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         <h2>{error}</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <FaBox /> Products Management
//         </h1>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={search}
//               className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               onChange={handleSearchChange}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>

//           <Link to="/admin/add/product">
//             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//               <FaPlus /> Add Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Debug info */}
//       <div className="mb-4 text-sm text-gray-600">
//         Current search: "{search}" | Products count: {products.length} | Loading: {loading ? "Yes" : "No"}
//       </div>

//       {/* Loading indicator during search */}
//       {loading && products.length > 0 && (
//         <div className="text-center text-gray-500 mb-4">
//           Searching...
//         </div>
//       )}

//       {/* Products Table */}
//       <div className="overflow-x-auto bg-white border rounded shadow">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Title</th>
//               <th className="py-2 px-4 border">Price</th>
//               <th className="py-2 px-4 border">Category</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.length > 0 ? (
//               products.map((prod) => (
//                 <tr key={prod._id} className="text-gray-700 hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{prod._id}</td>
//                   <td className="py-2 px-4 border">{prod.title}</td>
//                   <td className="py-2 px-4 border">${prod.price}</td>
//                   <td className="py-2 px-4 border">{prod.category}</td>

//                   <td className="py-2 px-4 border flex gap-2">
//                     <Link to={`/admin/edit/product/${prod._id}`}>
//                       <button className="text-blue-600 hover:text-blue-800">
//                         <FaEdit />
//                       </button>
//                     </Link>

//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(prod._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="py-4 text-center text-gray-500">
//                   No products found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect } from "react";
import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ALL products from backend once
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("http://localhost:3000/api/products/");
      console.log("API Response:", res.data);
      setProducts(res.data.products);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load products.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  };

  // Handle search - just update state
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter products on the frontend based on search term
  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaBox /> Products Management
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearchChange}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <Link to="/admin/add/product">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <FaPlus /> Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white border rounded shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <tr key={prod._id} className="text-gray-700 hover:bg-gray-50">
                  <td className="py-2 px-4 border">{prod._id}</td>
                  <td className="py-2 px-4 border">{prod.title}</td>
                  <td className="py-2 px-4 border">${prod.price}</td>
                  <td className="py-2 px-4 border">{prod.category}</td>

                  <td className="py-2 px-4 border flex gap-2">
                    <Link to={`/admin/edit/product/${prod._id}`}>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                    </Link>

                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(prod._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;