import React, { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(res => setOrders(res.data));
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const res = await updateOrderStatus(id, status);
    setOrders(orders.map(o => o._id === id ? res.data : o));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="mb-2 border p-2 rounded">
          <div>Table: {order.table?.number || "N/A"}</div>
          <div>Status: {order.status}</div>
          <button
            onClick={() => handleStatusUpdate(order._id, "completed")}
            className="bg-green-500 text-white px-2 py-1 rounded mt-1"
          >
            Mark as Completed
          </button>
        </div>
      ))}
    </div>
  );
}