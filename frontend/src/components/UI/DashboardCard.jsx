import React from "react";

export default function DashboardCard({ title, value, icon, className = "" }) {
  return (
    <div className={`bg-white shadow rounded-lg p-6 flex items-center gap-4 ${className}`}>
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
      <div>
        <div className="text-gray-500 text-sm">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}