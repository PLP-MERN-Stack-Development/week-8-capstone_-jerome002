import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    salary: '',
  });
  const [error, setError] = useState('');

  // Fetch all staff members
  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/staff');
      setStaffList(res.data);
    } catch (err) {
      console.error('Error fetching staff:', err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, role, email, phone, salary, _id } = formData;

    if (!name || !role || !email || !salary) {
      setError('All fields are required');
      return;
    }

    try {
      if (_id) {
        // Update existing staff
        const res = await axios.put(`http://localhost:5000/api/staff/${_id}`, formData);
        setStaffList(
          staffList.map((s) => (s._id === _id ? res.data : s))
        );
      } else {
        // Add new staff
        const res = await axios.post('http://localhost:5000/api/staff', formData);
        setStaffList([...staffList, res.data]);
      }

      // Reset form
      setFormData({
        name: '',
        role: '',
        email: '',
        phone: '',
        salary: '',
      });
    } catch (err) {
      console.error('Error saving staff:', err);
      setError(err.response?.data?.message || 'Failed to save staff');
    }
  };

  // Edit staff
  const handleEdit = (staff) => {
    setFormData({
      ...staff,
      salary: staff.salary || '',
      phone: staff.phone || '',
    });
  };

  // Delete staff
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/staff/${id}`);
      setStaffList(staffList.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Failed to delete staff:', err);
      setError('Failed to delete staff member');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Staff</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            placeholder="Role"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="salary"
            value={formData.salary}
            placeholder="Salary"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {formData._id ? 'Update Staff' : 'Add Staff'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6 mb-2">Staff List</h3>
      <ul className="space-y-2">
        {staffList.map((staff) => (
          <li
            key={staff._id}
            className="border p-3 rounded text-sm bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{staff.name}</span> — {staff.role}
                <br />
                {staff.email} — {staff.phone}
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold">
                  KES {staff.salary}
                </p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleEdit(staff)}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Staff;
