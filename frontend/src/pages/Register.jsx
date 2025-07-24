import React, { useState } from 'react';
import axios from 'axios';
import { backendURL } from '../config';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendURL}/api/auth/register`, formData);
      alert("Registration successful! You can now login.");
      onRegister();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
