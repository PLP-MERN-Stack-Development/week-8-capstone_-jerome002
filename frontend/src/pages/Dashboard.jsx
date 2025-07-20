import React, { useEffect, useState, useContext } from "react";
import DashboardCard from "../components/UI/DashboardCard";
import { FaDollarSign, FaConciergeBell, FaChair } from "react-icons/fa";
import { fetchOrders, fetchTables } from "../services/api";
import { AuthContext } from "../context/AuthContext"; 

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders().then(res => setOrders(res.data));
    fetchTables().then(res => setTables(res.data));
  }, []);

  const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const activeOrders = orders.filter(o => o.status !== "completed" && o.status !== "cancelled").length;
  const availableTables = tables.filter(t => t.status === "available").length;

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Active Orders"
          value={activeOrders}
          icon={<FaConciergeBell />}
        />
        <DashboardCard
          title="Available Tables"
          value={availableTables}
          icon={<FaChair />}
        />
        {user.role === "admin" && (
          <DashboardCard
            title="Total Sales"
            value={`$${totalSales}`}
            icon={<FaDollarSign />}
          />
        )}
      </div>
      <div className="mt-8 text-gray-400 text-center">
        {user.role === "admin"
          ? "More admin metrics and charts coming soon..."
          : "Contact your admin for more features."}
      </div>
    </div>
  );
}