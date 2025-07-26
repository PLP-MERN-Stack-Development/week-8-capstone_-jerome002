// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Order from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Staff from "./pages/Staff";
import Layout from "./Layout"; // from a page file in /pages



import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <ProtectedRoute>
              <Dashboard user={user} setUser={setUser} />
            </ProtectedRoute>
            </Layout>

          }
        />
        <Route
          path="/menu"
          element={
            <Layout>
              <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
            </Layout>
            
          }
        />
        <Route
          path="/order"
          element={
            <Layout>
              <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
            </Layout>
          
         
           }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
            </Layout>
            
          }
        />
        <Route
          path="/staff"
          element={
            <Layout>
              <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
            </Layout>
            
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
