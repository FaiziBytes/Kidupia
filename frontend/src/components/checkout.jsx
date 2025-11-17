import React, { useEffect, useState } from "react";
import {useOrder} from "../contexts/OrderContext.jsx";

const OrderForm = () => {
  const { orders, loading, fetchOrders, updateOrderStatus } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (selectedOrder && status) {
      updateOrderStatus(selectedOrder, status);
      setStatus("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded">
      <h2 className="text-xl mb-4">Update Order Status</h2>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedOrder}
          onChange={e => setSelectedOrder(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Order</option>
          {orders.map(order => (
            <option key={order._id} value={order._id}>
              {order._id} - {order.status}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
