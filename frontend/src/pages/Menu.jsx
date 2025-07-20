// src/components/Menu.jsx
import React, { useEffect, useState } from "react";
import {
  fetchMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/api";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu()
      .then((res) => setMenu(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    const newItem = { name: "New Item", price: 0 };
    const res = await createMenuItem(newItem);
    setMenu([...menu, res.data]);
  };

  const handleUpdate = async (id, updated) => {
    const res = await updateMenuItem(id, updated);
    setMenu(menu.map((item) => (item._id === id ? res.data : item)));
  };

  const handleDelete = async (id) => {
    await deleteMenuItem(id);
    setMenu(menu.filter((item) => item._id !== id));
  };

  if (loading) return <div>Loading menu...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menu</h1>

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Menu Item
      </button>

      {menu.map((item) => (
        <div
          key={item._id}
          className="mb-2 flex items-center justify-between border-b pb-2"
        >
          <div>
            <span className="font-semibold">{item.name}</span> - ${item.price}
          </div>
          <div>
            <button
              onClick={() =>
                handleUpdate(item._id, {
                  ...item,
                  name: item.name + " (Edited)",
                })
              }
              className="text-green-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="text-red-500 ml-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
