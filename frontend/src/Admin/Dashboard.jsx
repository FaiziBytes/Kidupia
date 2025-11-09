// // // 

// // // src/pages/Dashboard.jsx
// // import React from "react";
// // import {
// //   FaShoppingCart,
// //   FaUsers,
// //   FaBoxes,
// //   FaChartLine,
// // } from "react-icons/fa";

// // const Dashboard = () => {
// //   return (
// //     <div className="flex-1 p-6 bg-gray-50 min-h-screen">
// //       {/* Page Header */}
// //       <h1 className="text-2xl font-semibold text-gray-800 mb-6">
// //         Dashboard
// //       </h1>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {/* Orders Card */}
// //         <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-gray-500 text-sm">Total Orders</p>
// //               <h2 className="text-2xl font-bold text-gray-800 mt-1">1,240</h2>
// //             </div>
// //             <div className="bg-pink-100 p-3 rounded-xl">
// //               <FaShoppingCart className="text-pink-600 text-xl" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Users Card */}
// //         <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-gray-500 text-sm">Customers</p>
// //               <h2 className="text-2xl font-bold text-gray-800 mt-1">320</h2>
// //             </div>
// //             <div className="bg-green-100 p-3 rounded-xl">
// //               <FaUsers className="text-green-600 text-xl" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Products Card */}
// //         <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-gray-500 text-sm">Products</p>
// //               <h2 className="text-2xl font-bold text-gray-800 mt-1">156</h2>
// //             </div>
// //             <div className="bg-blue-100 p-3 rounded-xl">
// //               <FaBoxes className="text-blue-600 text-xl" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Revenue Card */}
// //         <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <p className="text-gray-500 text-sm">Revenue</p>
// //               <h2 className="text-2xl font-bold text-gray-800 mt-1">$12,450</h2>
// //             </div>
// //             <div className="bg-yellow-100 p-3 rounded-xl">
// //               <FaChartLine className="text-yellow-600 text-xl" />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recent Orders Table */}
// //       <div className="bg-white rounded-2xl shadow mt-10 overflow-x-auto">
// //         <div className="p-6 border-b">
// //           <h2 className="text-lg font-semibold text-gray-800">
// //             Recent Orders
// //           </h2>
// //         </div>
// //         <table className="w-full text-left text-sm text-gray-600">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="py-3 px-6">Order ID</th>
// //               <th className="py-3 px-6">Customer</th>
// //               <th className="py-3 px-6">Date</th>
// //               <th className="py-3 px-6">Total</th>
// //               <th className="py-3 px-6">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             <tr className="border-t hover:bg-gray-50">
// //               <td className="py-3 px-6">#1023</td>
// //               <td className="py-3 px-6">Ali Khan</td>
// //               <td className="py-3 px-6">Nov 8, 2025</td>
// //               <td className="py-3 px-6">$230</td>
// //               <td className="py-3 px-6 text-green-600 font-medium">
// //                 Shipped
// //               </td>
// //             </tr>
// //             <tr className="border-t hover:bg-gray-50">
// //               <td className="py-3 px-6">#1024</td>
// //               <td className="py-3 px-6">Sara Ahmed</td>
// //               <td className="py-3 px-6">Nov 7, 2025</td>
// //               <td className="py-3 px-6">$145</td>
// //               <td className="py-3 px-6 text-yellow-600 font-medium">
// //                 Pending
// //               </td>
// //             </tr>
// //             <tr className="border-t hover:bg-gray-50">
// //               <td className="py-3 px-6">#1025</td>
// //               <td className="py-3 px-6">Hamza Ali</td>
// //               <td className="py-3 px-6">Nov 6, 2025</td>
// //               <td className="py-3 px-6">$560</td>
// //               <td className="py-3 px-6 text-red-600 font-medium">
// //                 Cancelled
// //               </td>
// //             </tr>
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import {
//   FaShoppingCart,
//   FaUsers,
//   FaBoxes,
//   FaChartLine,
// } from "react-icons/fa";

// const Dashboard = () => {
//   const [stats, setStats] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch data from backend
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/dashboard");
//         if (!res.ok) throw new Error("Failed to fetch data");
//         const data = await res.json();
//         setStats(data.stats);
//         setOrders(data.recentOrders);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="flex-1 p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

//       {loading ? (
//         <p className="text-gray-500">Loading dashboard data...</p>
//       ) : error ? (
//         <p className="text-red-600">Error: {error}</p>
//       ) : (
//         <>
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <StatCard
//               title="Total Orders"
//               value={stats.totalOrders}
//               icon={<FaShoppingCart className="text-pink-600 text-xl" />}
//               bg="bg-pink-100"
//             />
//             <StatCard
//               title="Customers"
//               value={stats.totalUsers}
//               icon={<FaUsers className="text-green-600 text-xl" />}
//               bg="bg-green-100"
//             />
//             <StatCard
//               title="Products"
//               value={stats.totalProducts}
//               icon={<FaBoxes className="text-blue-600 text-xl" />}
//               bg="bg-blue-100"
//             />
//             <StatCard
//               title="Revenue"
//               value={`$${stats.totalRevenue}`}
//               icon={<FaChartLine className="text-yellow-600 text-xl" />}
//               bg="bg-yellow-100"
//             />
//           </div>

//           {/* Recent Orders Table */}
//           <div className="bg-white rounded-2xl shadow mt-10 overflow-x-auto">
//             <div className="p-6 border-b">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Recent Orders
//               </h2>
//             </div>
//             <table className="w-full text-left text-sm text-gray-600">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="py-3 px-6">Order ID</th>
//                   <th className="py-3 px-6">Customer</th>
//                   <th className="py-3 px-6">Date</th>
//                   <th className="py-3 px-6">Total</th>
//                   <th className="py-3 px-6">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr
//                     key={order._id}
//                     className="border-t hover:bg-gray-50 transition"
//                   >
//                     <td className="py-3 px-6 font-medium text-gray-800">
//                       #{order._id}
//                     </td>
//                     <td className="py-3 px-6">{order.customer}</td>
//                     <td className="py-3 px-6">
//                       {new Date(order.date).toLocaleDateString()}
//                     </td>
//                     <td className="py-3 px-6">${order.total}</td>
//                     <td
//                       className={`py-3 px-6 font-medium ${
//                         order.status === "Shipped"
//                           ? "text-green-600"
//                           : order.status === "Pending"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {order.status}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ✅ Reusable stat card
// const StatCard = ({ title, value, icon, bg }) => (
//   <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
//     <div className="flex justify-between items-center">
//       <div>
//         <p className="text-gray-500 text-sm">{title}</p>
//         <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
//       </div>
//       <div className={`${bg} p-3 rounded-xl`}>{icon}</div>
//     </div>
//   </div>
// );

// export default Dashboard;



// src/pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaShoppingCart,
//   FaUsers,
//   FaBoxes,
//   FaChartLine,
// } from "react-icons/fa";

// const Dashboard = () => {
//   const [stats, setStats] = useState({});
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch data using Axios
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:3000/api/dashboard", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           timeout: 10000, // 10 seconds timeout for safety
//         });
//         setStats(data.stats);
//         setOrders(data.recentOrders);
//       } catch (err) {
//         console.error("❌ Error fetching dashboard data:", err);
//         setError(
//           err.response?.data?.message || "Failed to load dashboard data"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="flex-1 p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

//       {/* Conditional UI */}
//       {loading ? (
//         <p className="text-gray-500 animate-pulse">Loading dashboard data...</p>
//       ) : error ? (
//         <div className="text-red-600 bg-red-50 p-4 rounded-lg">
//           ⚠️ Error: {error}
//         </div>
//       ) : (
//         <>
//           {/* Stats Section */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <StatCard
//               title="Total Orders"
//               value={stats.totalOrders}
//               icon={<FaShoppingCart className="text-pink-600 text-xl" />}
//               bg="bg-pink-100"
//             />
//             <StatCard
//               title="Customers"
//               value={stats.totalUsers}
//               icon={<FaUsers className="text-green-600 text-xl" />}
//               bg="bg-green-100"
//             />
//             <StatCard
//               title="Products"
//               value={stats.totalProducts}
//               icon={<FaBoxes className="text-blue-600 text-xl" />}
//               bg="bg-blue-100"
//             />
//             <StatCard
//               title="Revenue"
//               value={`$${stats.totalRevenue}`}
//               icon={<FaChartLine className="text-yellow-600 text-xl" />}
//               bg="bg-yellow-100"
//             />
//           </div>

//           {/* Recent Orders Table */}
//           <div className="bg-white rounded-2xl shadow mt-10 overflow-x-auto">
//             <div className="p-6 border-b flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Recent Orders
//               </h2>
//               <button className="text-sm text-pink-600 hover:underline">
//                 View All
//               </button>
//             </div>
//             {orders.length === 0 ? (
//               <p className="p-6 text-gray-500">No recent orders found.</p>
//             ) : (
//               <table className="w-full text-left text-sm text-gray-600">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="py-3 px-6">Order ID</th>
//                     <th className="py-3 px-6">Customer</th>
//                     <th className="py-3 px-6">Date</th>
//                     <th className="py-3 px-6">Total</th>
//                     <th className="py-3 px-6">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order) => (
//                     <tr
//                       key={order._id}
//                       className="border-t hover:bg-gray-50 transition"
//                     >
//                       <td className="py-3 px-6 font-medium text-gray-800">
//                         #{order._id}
//                       </td>
//                       <td className="py-3 px-6">{order.customer}</td>
//                       <td className="py-3 px-6">
//                         {new Date(order.date).toLocaleDateString()}
//                       </td>
//                       <td className="py-3 px-6">${order.total}</td>
//                       <td
//                         className={`py-3 px-6 font-medium ${
//                           order.status === "Shipped"
//                             ? "text-green-600"
//                             : order.status === "Pending"
//                             ? "text-yellow-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {order.status}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ✅ Reusable Card Component
// const StatCard = ({ title, value, icon, bg }) => (
//   <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition-shadow duration-200">
//     <div className="flex justify-between items-center">
//       <div>
//         <p className="text-gray-500 text-sm">{title}</p>
//         <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
//       </div>
//       <div className={`${bg} p-3 rounded-xl`}>{icon}</div>
//     </div>
//   </div>
// );

// export default Dashboard;




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

  // ✅ Simulate backend data
  useEffect(() => {
    setTimeout(() => {
      try {
        const dummyStats = {
          totalOrders: 234,
          totalUsers: 120,
          totalProducts: 58,
          totalRevenue: 15432,
        };

        const dummyOrders = [
          {
            _id: "ORD1234",
            customer: "John Doe",
            date: "2025-11-07T14:32:00Z",
            total: 89.99,
            status: "Shipped",
          },
          {
            _id: "ORD5678",
            customer: "Jane Smith",
            date: "2025-11-06T10:15:00Z",
            total: 129.49,
            status: "Pending",
          },
          {
            _id: "ORD9101",
            customer: "Ali Khan",
            date: "2025-11-05T09:20:00Z",
            total: 59.99,
            status: "Cancelled",
          },
          {
            _id: "ORD1122",
            customer: "Sara Ahmed",
            date: "2025-11-03T16:45:00Z",
            total: 199.0,
            status: "Shipped",
          },
        ];

        setStats(dummyStats);
        setOrders(dummyOrders);
      } catch (err) {
        setError("Failed to load dummy data");
      } finally {
        setLoading(false);
      }
    }, 1000); // ⏳ simulate 1s delay
  }, []);

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Conditional UI */}
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
              value={stats.totalOrders}
              icon={<FaShoppingCart className="text-pink-600 text-xl" />}
              bg="bg-pink-100"
            />
            <StatCard
              title="Customers"
              value={stats.totalUsers}
              icon={<FaUsers className="text-green-600 text-xl" />}
              bg="bg-green-100"
            />
            <StatCard
              title="Products"
              value={stats.totalProducts}
              icon={<FaBoxes className="text-blue-600 text-xl" />}
              bg="bg-blue-100"
            />
            <StatCard
              title="Revenue"
              value={`$${stats.totalRevenue}`}
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
                      <td className="py-3 px-6">{order.customer}</td>
                      <td className="py-3 px-6">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6">${order.total}</td>
                      <td
                        className={`py-3 px-6 font-medium ${
                          order.status === "Shipped"
                            ? "text-green-600"
                            : order.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
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
