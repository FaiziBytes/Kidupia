// import React from 'react'

// const Products = () => {
//   return (
//     <div>Products</div>
//   )
// }

// export default Products

import React, { useState } from "react";
import { FaBox, FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const sampleProducts = [
  // Placeholder data; replace with API data later
  { id: "1", name: "Product A", price: 25, category: "Category 1" },
  { id: "2", name: "Product B", price: 40, category: "Category 2" },
  { id: "3", name: "Product C", price: 30, category: "Category 1" },
];

const Products = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
              className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => alert("Open Add Product Modal")}
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white border rounded shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <tr key={prod.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="py-2 px-4 border">{prod.id}</td>
                  <td className="py-2 px-4 border">{prod.name}</td>
                  <td className="py-2 px-4 border">${prod.price}</td>
                  <td className="py-2 px-4 border">{prod.category}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => alert(`Edit ${prod.name}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(prod.id)}
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

      {/* Pagination Placeholder */}
      <div className="mt-4 flex justify-end gap-2">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">1</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
      </div>
    </div>
  );
};

export default Products;
