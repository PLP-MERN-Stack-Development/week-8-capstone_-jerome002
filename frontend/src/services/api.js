// src/services/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  // You can add headers or interceptors here if needed
});

// Example API methods:
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);

export const fetchMenu = () => api.get("/menu");
export const createMenuItem = (item) => api.post("/menu", item);
export const updateMenuItem = (id, item) => api.put(`/menu/${id}`, item);
export const deleteMenuItem = (id) => api.delete(`/menu/${id}`);

export const fetchOrders = () => api.get("/orders");
export const createOrder = (order) => api.post("/orders", order);
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}`, { status });

export const fetchTables = () => api.get("/tables");
export const updateTable = (id, data) => api.put(`/tables/${id}`, data);

// ...add more as needed