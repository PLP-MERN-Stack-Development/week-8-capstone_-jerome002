import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import Staff from "./pages/Staff";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [username] = useState("Jane Doe");
  const handleLogout = () => alert("Logged out!");

  return (
    <Routes>
      <Route element={<Layout username={username} onLogout={handleLogout} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/staff" element={<Staff />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
