import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="md:hidden font-bold text-lg">Restaurant</div>
      <div className="flex items-center gap-4 ml-auto">
        <span className="text-sm text-gray-700">
          Hello, <span className="font-medium">{user?.name}</span>
        </span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}