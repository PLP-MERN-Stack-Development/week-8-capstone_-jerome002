import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Example placeholders for future pages
// import Orders from "./pages/Orders";
// import Tables from "./pages/Tables";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    // Router here is optional if you already wrap your app with BrowserRouter in main.jsx
    // <Router>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Example for additional protected routes */}
        {/*
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <Tables />
            </ProtectedRoute>
          }
        />
        */}

        {/* Catch-all for undefined routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    // </Router>
  );
}

export default App;