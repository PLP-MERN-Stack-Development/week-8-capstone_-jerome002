// src/pages/Dashboard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Hello, {user?.username}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          to="/menu"
          className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700 text-center"
        >
          Menu
        </Link>
        <Link
          to="/inventory"
          className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700 text-center"
        >
          Inventory
        </Link>
        <Link
          to="/staff"
          className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700 text-center"
        >
           Staff
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;
