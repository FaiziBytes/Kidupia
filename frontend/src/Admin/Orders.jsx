

import React, { useState } from "react";
import { FaShoppingCart, FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const sampleOrders = [
  {
    id: "1001",
    customer: "John Doe",
    total: 120,
    status: "Pending",
    date: "2025-11-08",
  },
  {
    id: "1002",
    customer: "Jane Smith",
    total: 250,
    status: "Completed",
    date: "2025-11-07",
  },
  {
    id: "1003",
    customer: "Alice Johnson",
    total: 75,
    status: "Processing",
    date: "2025-11-06",
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    setOrders(orders.filter((o) => o.id !== id));
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaShoppingCart /> Orders Management
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by customer or status..."
              className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white border rounded shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Total ($)</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="py-2 px-4 border">{order.id}</td>
                  <td className="py-2 px-4 border">{order.customer}</td>
                  <td className="py-2 px-4 border">${order.total}</td>
                  <td className="py-2 px-4 border">{order.status}</td>
                  <td className="py-2 px-4 border">{order.date}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => alert(`View order ${order.id}`)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => alert(`Edit order ${order.id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(order.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No orders found
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

export default Orders;
