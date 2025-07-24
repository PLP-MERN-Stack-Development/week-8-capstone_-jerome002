import axios from "axios";
import { useEffect, useState } from "react";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menu.length === 0 ? (
          <p>No menu items available.</p>
        ) : (
          menu.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="mt-2 text-indigo-600 font-bold">Ksh {item.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
