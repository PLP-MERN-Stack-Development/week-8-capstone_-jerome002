// src/pages/Inventory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../config"; // Add this line

function Inventory() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: "", quantity: "", price: "" });
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${backendURL}/api/inventory`);
    setItems(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await axios.put(`${backendURL}/api/inventory/${editingItem._id}`, formData);
    } else {
      await axios.post(`${backendURL}/api/inventory`, formData);
    }
    setFormData({ name: "", quantity: "", price: "" });
    setEditingItem(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, quantity: item.quantity, price: item.price });
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${backendURL}/api/inventory/${id}`);
    fetchItems();
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            name="name"
            type="text"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingItem ? "Update Item" : "Add Item"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow-md table-auto">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">Ksh {item.price}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
