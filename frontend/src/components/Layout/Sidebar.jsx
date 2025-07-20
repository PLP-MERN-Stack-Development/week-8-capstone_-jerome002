import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Menu", path: "/menu" },
  { name: "Tables", path: "/tables" },
  { name: "Staff", path: "/staff" },
];

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 flex-shrink-0 h-full hidden md:flex flex-col">
      <div className="py-6 px-4 font-bold text-xl tracking-wide border-b border-gray-700">
        Restaurant
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-colors ${
                isActive
                  ? "bg-gray-900 font-semibold"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}