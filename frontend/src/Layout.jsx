// src/components/Layout.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
          <Link to="/menu" className="hover:text-yellow-400">Menu</Link>
          <Link to="/order" className="hover:text-yellow-400">Orders</Link>
          <Link to="/inventory" className="hover:text-yellow-400">Inventory</Link>
          <Link to="/staff" className="hover:text-yellow-400">Staff</Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-white py-4">
        &copy; {new Date().getFullYear()} G-Rome Technologies. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
