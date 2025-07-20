import React, { useEffect, useState } from "react";
import { fetchMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../services/api";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu().then(res => setMenu(res.data));
  }, []);

  // Example: add, edit, delete handlers
  const handleAdd = async (newItem) => {
    const res = await createMenuItem(newItem);
    setMenu([...menu, res.data]);
  };

   const handleUpdate = async (id, updated) => {
   const res = await updateMenuItem(id, updated);
  setMenu(menu.map(item => item._id === id ? res.data : item));
  };

  const handleDelete = async (id) => {
    await deleteMenuItem(id);
    setMenu(menu.filter(item => item._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Menu</h1>
      {/* Add Menu Item */}
      <button
        onClick={() =>
          handleAdd({ name: "New Item", price: 0 })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Menu Item
      </button>
      {/* Render menu items and provide add/edit/delete actions */}
      {menu.map(item => (
        <div key={item._id} className="mb-2 flex items-center justify-between">
          <div>
            <span className="font-semibold">{item.name}</span> - ${item.price}
          </div>
          <div>
            <button
              onClick={() =>
                handleUpdate(item._id, { ...item, name: item.name + " (Edited)" })
              }
              className="text-green-500 mr-2"
            >
              Edit
            </button>
            <button onClick={() => handleDelete(item._id)} className="text-red-500 ml-2">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}