import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/orders");
      setOrders(res.data.orders);
    } catch (err) {
      setError(err.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/orders/${orderId}/status`, { status });
      setOrders(prev =>
        prev.map(o => (o._id === orderId ? res.data.order : o))
      );
    } catch (err) {
      setError(err.message || "Error updating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{ orders, loading, error, fetchOrders, updateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
