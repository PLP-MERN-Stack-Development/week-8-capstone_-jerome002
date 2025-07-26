import axios from "axios";
import { useEffect, useState } from "react";
import { backendURL } from "../config";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch menu items
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/menu`);
      setMenu(res.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
      setError("Failed to load menu. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or Edit item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${backendURL}/api/menu/${editId}`, form);
      } else {
        await axios.post(`${backendURL}/api/menu`, form);
      }
      setForm({ name: "", description: "", price: "", category: "", available: true });
      setIsEditing(false);
      setEditId(null);
      fetchMenu();
    } catch (err) {
      console.error("Failed to save menu item:", err);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/menu/${id}`);
      fetchMenu();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  // Edit item
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      available: item.available,
    });
    setIsEditing(true);
    setEditId(item._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 rounded"
        />
        <label className="flex items-center gap-2 col-span-full">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-full"
        >
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading menu...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : menu.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menu.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="mt-2 text-indigo-600 font-bold">
                Ksh {item.price}
              </p>
              <p className="text-sm text-gray-500">
                Category: {item.category || "Uncategorized"}
              </p>
              <p className="text-sm">
                {item.available ? "✅ Available" : "❌ Unavailable"}
              </p>
              <div className="mt-4 flex gap-2">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
