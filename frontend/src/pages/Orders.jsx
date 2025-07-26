import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(res.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem || quantity < 1) return;

    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: [{ menuItem: selectedItem, quantity }],
        tableNumber: 1, // optional static value or from user input
      });

      setSelectedItem("");
      setQuantity(1);
      fetchOrders();
    } catch (err) {
      console.error("Failed to place order:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Make an Order</h2>

      {/* Order Form */}
      <form
        onSubmit={handleOrderSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Menu Item</option>
            {menuItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - Ksh {item.price}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded"
            placeholder="Quantity"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Submit Order
        </button>
      </form>

      {/* Order List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Order History</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border p-3 rounded"
              >
                <p className="font-semibold mb-2">Table: {order.tableNumber || "N/A"} | Total: Ksh {order.total}</p>
                <ul className="pl-4 list-disc text-sm">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.menuItem?.name || "Deleted Item"} x {item.quantity} = Ksh{" "}
                      {(item.menuItem?.price || 0) * item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
