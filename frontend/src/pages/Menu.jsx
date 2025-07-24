import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/menu`);
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("Failed to load menu. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

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
              <p className="mt-2 text-indigo-600 font-bold">Ksh {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
