import React, { useState, useEffect } from "react";
import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // reset to page 1 when searching
  };

  // Filter products
  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <button className="flex items-center gap-2 px-4 py-2 bg-[#E60076] text-white rounded hover:bg-blue-700">
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
            {currentItems.length > 0 ? (
              currentItems.map((prod) => (
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

      {/* PAGINATION BELOW TABLE */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">

          <button
            className="px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? "bg-[#E60076] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default Products;
