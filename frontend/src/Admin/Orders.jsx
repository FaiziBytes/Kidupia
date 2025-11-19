
// import React, { useState,useEffect } from "react";
// import { FaShoppingCart, FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// import axios from "axios";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");


//   const getOrder = async () => {
//     const token = localStorage.getItem("token")

//     try {
//       const res = await axios.get("http://localhost:3000/api/orders/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrders(res.data.orders)
//     } catch (error) {
//       console.log("error",error.message);
//     }
//   }

//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;
//     setOrders(orders.filter((o) => o.id !== id));
//   };

//   const filteredOrders = orders.filter(
//     (o) =>
//       o.customer.toLowerCase().includes(search.toLowerCase()) ||
//       o.status.toLowerCase().includes(search.toLowerCase())
//   );
//   useEffect(() => {
//     getOrder();
//   }, [])

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <FaShoppingCart /> Orders Management
//         </h1>

//         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search by customer or status..."
//               className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           </div>
//         </div>
//       </div>

//       {/* Orders Table */}
//       <div className="overflow-x-auto bg-white border rounded shadow">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Customer</th>
//               <th className="py-2 px-4 border">Total ($)</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Date</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.length > 0 ? (
//               filteredOrders.map((order) => (
//                 <tr key={order.id} className="text-gray-700 hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{order._id}</td>
//                   <td className="py-2 px-4 border">{order.shippingAddress.name}</td>
//                   <td className="py-2 px-4 border">${orders.length}</td>
//                   <td className="py-2 px-4 border">{order.orderStatus}</td>
//                   {/* <td className="py-2 px-4 border">{order.date}</td> */}
//                   <td className="py-2 px-4 border flex gap-2">
//                     <button
//                       className="text-green-600 hover:text-green-800"
//                       onClick={() => alert(`View order ${order._id}`)}
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       className="text-blue-600 hover:text-blue-800"
//                       onClick={() => alert(`Edit order ${order._id}`)}
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(order._id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="py-4 text-center text-gray-500">
//                   No orders found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Placeholder */}
//       <div className="mt-4 flex justify-end gap-2">
//         <button className="px-3 py-1 border rounded hover:bg-gray-100">Prev</button>
//         <button className="px-3 py-1 border rounded hover:bg-gray-100">1</button>
//         <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
//         <button className="px-3 py-1 border rounded hover:bg-gray-100">Next</button>
//       </div>
//     </div>
//   );
// };

// export default Orders;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaShoppingCart, FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/api/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Delete order from UI
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    setOrders(orders.filter((o) => o._id !== id));
  };

  // Filter orders based on search input
  const filteredOrders = orders.filter(
    (o) =>
      (o.shippingAddress?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (o.orderStatus || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaShoppingCart /> Orders Management
        </h1>

        {/* Search */}
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
        {loading ? (
          <p className="p-6 text-gray-500 animate-pulse">Loading orders...</p>
        ) : error ? (
          <p className="p-6 text-red-600">Error: {error}</p>
        ) : (
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
                  <tr key={order._id} className="text-gray-700 hover:bg-gray-50">
                    <td className="py-2 px-4 border">{order._id}</td>
                    <td className="py-2 px-4 border">{order.shippingAddress?.name || "N/A"}</td>
                    <td className="py-2 px-4 border">${order.totalPrice}</td>
                    <td className="py-2 px-4 border">{order.orderStatus || "N/A"}</td>
                    <td className="py-2 px-4 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => alert(`View order ${order._id}`)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => alert(`Edit order ${order._id}`)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(order._id)}
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
        )}
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
