// src/components/Layout.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Menu", path: "/menu" },
  { name: "Tables", path: "/tables" },
  { name: "Staff", path: "/staff" },
];

export default function Layout({ children, username = "Admin", onLogout }) {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="text-2xl font-bold px-6 py-4 border-b border-gray-800">
           Restaurant
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-md hover:bg-gray-700 transition ${
                location.pathname === link.path ? "bg-gray-800 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 text-sm border-t border-gray-800 text-center">
          Logged in as <strong>{username}</strong>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
