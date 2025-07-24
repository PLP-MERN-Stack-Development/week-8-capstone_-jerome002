import { createContext, useEffect, useState } from "react";
import axios from "axios";
import backendURL from "../config"; // Adjust path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const res = await axios.post(`${backendURL}/api/auth/login`, {
      email,
      password,
    });
    setUser(res.data.user); // Make sure the backend sends this
  };

  const register = async (inputs) => {
    await axios.post(`${backendURL}/api/auth/register`, inputs);
  };

  const logout = async () => {
    await axios.post(`${backendURL}/api/auth/logout`);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
