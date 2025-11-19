import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaUsers,
  FaBoxes,
  FaChartLine,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


const getOrder = async () => {
    const token = localStorage.getItem("token")
      setLoading(false);
    try {
      const res = await axios.get("http://localhost:3000/api/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders)
      console.log(res.data.orders)
    } catch (error) {
      console.log("error",error.message);
    }
  }
  useEffect(() => {
    getOrder();
  }, [])
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

       Conditional UI
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading dashboard data...</p>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">
          ⚠️ Error: {error}
        </div>
      ) : ( 
        <>
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Orders"
              value={orders.length}
              icon={<FaShoppingCart className="text-pink-600 text-xl" />}
              bg="bg-pink-100"
            />
            <StatCard
              title="Customers"
              value={20}
              icon={<FaUsers className="text-green-600 text-xl" />}
              bg="bg-green-100"
            />
            <StatCard
              title="Products"
              value={23}
              icon={<FaBoxes className="text-blue-600 text-xl" />}
              bg="bg-blue-100"
            />
            <StatCard
              title="Revenue"
              value={`$${400}`}
              icon={<FaChartLine className="text-yellow-600 text-xl" />}
              bg="bg-yellow-100"
            />
          </div> 

          {/* Recent Orders Table */}
          <div className="bg-white rounded-2xl shadow mt-10 overflow-x-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h2>
              <button className="text-sm text-pink-600 hover:underline">
                View All
              </button>
            </div>
            {orders.length === 0 ? (
              <p className="p-6 text-gray-500">No recent orders found.</p>
            ) : (
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6">Order ID</th>
                    <th className="py-3 px-6">Customer</th>
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Total</th>
                    <th className="py-3 px-6">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-6 font-medium text-gray-800">
                        #{order._id}
                      </td>
                      <td className="py-3 px-6">{order.shippingAddress.name}</td>
                      <td className="py-3 px-6">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">${order.totalPrice}</td>
                      <td
                        className={`py-3 px-6 font-medium ${order.orderStatus === "Shipped"
                            ? "text-green-600"
                            : order.status === "Pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                      >
                        {order.orderStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
     )} {/* )} */}
    </div>
  );
};

// ✅ Reusable StatCard component
const StatCard = ({ title, value, icon, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>
      <div className={`${bg} p-3 rounded-xl`}>{icon}</div>
    </div>
  </div>
);

export default Dashboard;
