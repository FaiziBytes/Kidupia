import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTags, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add Category modal states
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [addLoading, setAddLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.get("http://localhost:3000/api/category/get-all", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (res.data.success) setCategories(res.data.categories);
      else setError("Failed to fetch categories");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error while fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Auto-clear messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      setMessage("Category name is required");
      return;
    }

    try {
      setAddLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.post(
        "http://localhost:3000/api/category/add",
        newCategory,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setCategories([res.data.category, ...categories]); // Update table instantly
        setMessage("Category added successfully!");
        setNewCategory({ name: "", description: "" });
        setShowModal(false);
      } else {
        setMessage(res.data.message || "Failed to add category");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Server error while adding category");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Categories Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 sm:mt-0 flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      {/* Feedback Message */}
      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Categories Table */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading categories...</p>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">⚠️ {error}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <FaTags className="text-pink-600" /> Category List
            </h2>
            <p className="text-sm text-gray-500">Total Categories: {categories.length}</p>
          </div>

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
                <tr key={cat._id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-6 font-medium text-gray-800">#{cat._id}</td>
                  <td className="py-3 px-6">{cat.name}</td>
                  <td className="py-3 px-6">{cat.products?.length || 0}</td>
                  <td className={`py-3 px-6 font-medium ${cat.status === "Active" ? "text-green-600" : "text-red-600"}`}>{cat.status}</td>
                  <td className="py-3 px-6">{new Date(cat.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center">
                    <button className="text-blue-600 hover:text-blue-800 mx-2"><FaEdit /></button>
                    <button className="text-red-600 hover:text-red-800 mx-2"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && <p className="p-6 text-gray-500">No categories found.</p>}
        </div>
      )}

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="border p-2 rounded w-full mb-3"
            />
            <textarea
              name="description"
              value={newCategory.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              className="border p-2 rounded w-full mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={addLoading}
                className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 disabled:opacity-70"
              >
                {addLoading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
