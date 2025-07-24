import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash, Plus} from 'react-feather';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    name: '',
    position: '',
    email: '',
    phone: '',
    salary: ''
  });

  const getStaff = async () => {
    try {
      const res = await axios.get('/api/staff');
      setStaff(res.data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  };

  const addStaff = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/staff', form);
      setForm({ name: '', position: '', email: '', phone: '', salary: '' });
      getStaff();
    } catch (error) {
      console.error('Failed to add staff:', error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await axios.delete(`/api/staff/${id}`);
      getStaff();
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">👨‍🍳 Staff Management</h2>

      <div className="card shadow p-4 mb-5">
        <h5 className="mb-3 text-primary">Add New Staff</h5>
        <form onSubmit={addStaff}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input type="text" className="form-control" placeholder="Name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-4 mb-3">
              <input type="text" className="form-control" placeholder="Position"
                value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required />
            </div>
            <div className="col-md-4 mb-3">
              <input type="email" className="form-control" placeholder="Email"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="col-md-4 mb-3">
              <input type="text" className="form-control" placeholder="Phone"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="col-md-4 mb-3">
              <input type="number" className="form-control" placeholder="Salary"
                value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
            </div>
            <div className="col-md-4 mb-3 d-grid">
              <button className="btn btn-success" type="submit">Add Staff</button>
            </div>
          </div>
        </form>
      </div>

      <div className="card shadow p-4">
        <h5 className="mb-3 text-primary">Staff List</h5>
        {staff.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.position}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>KES {Number(s.salary).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteStaff(s._id)}>
                        <Trash size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No staff records found.</p>
        )}
      </div>
    </div>
  );
}

export default Staff;
