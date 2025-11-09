import React, { useEffect, useState } from "react";
import { FaTags, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy category data (simulate backend)
  useEffect(() => {
    setTimeout(() => {
      try {
        const dummyCategories = [
          {
            _id: "CAT001",
            name: "Electronics",
            products: 120,
            status: "Active",
            createdAt: "2025-08-12",
          },
          {
            _id: "CAT002",
            name: "Clothing",
            products: 80,
            status: "Active",
            createdAt: "2025-07-10",
          },
          {
            _id: "CAT003",
            name: "Home Appliances",
            products: 45,
            status: "Inactive",
            createdAt: "2025-09-01",
          },
          {
            _id: "CAT004",
            name: "Sports & Fitness",
            products: 60,
            status: "Active",
            createdAt: "2025-10-25",
          },
        ];

        setCategories(dummyCategories);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Categories Management
        </h1>
        <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading categories...</p>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">
          ⚠️ Error: {error}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaTags className="text-pink-600" /> Category List
            </h2>
            <p className="text-sm text-gray-500">
              Total Categories: {categories.length}
            </p>
          </div>

          {/* Table */}
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6">Category ID</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Products</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Created</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-6 font-medium text-gray-800">
                    #{cat._id}
                  </td>
                  <td className="py-3 px-6">{cat.name}</td>
                  <td className="py-3 px-6">{cat.products}</td>
                  <td
                    className={`py-3 px-6 font-medium ${
                      cat.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {cat.status}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="text-blue-600 hover:text-blue-800 mx-2">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800 mx-2">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Categories */}
          {categories.length === 0 && (
            <p className="p-6 text-gray-500">No categories found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
