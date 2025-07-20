import React, { useEffect, useState } from "react";
import { fetchTables, updateTable } from "../services/api";

export default function Tables() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetchTables().then(res => setTables(res.data));
  }, []);

  const handleReserve = async (id) => {
    const res = await updateTable(id, { status: "reserved" });
    setTables(tables.map(t => t._id === id ? res.data : t));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tables</h1>
      {tables.map(table => (
        <div key={table._id} className="mb-2 border p-2 rounded flex items-center justify-between">
          <div>
            Table #{table.number} - {table.status}
          </div>
          {table.status === "available" && (
            <button
              onClick={() => handleReserve(table._id)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Reserve
            </button>
          )}
        </div>
      ))}
    </div>
  );
}