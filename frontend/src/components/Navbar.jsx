// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#f4f4f4', borderBottom: '1px solid #ccc' }}>
      <Link to="/dashboard" style={{ marginRight: '15px' }}>
         Dashboard
      </Link>
      {/* Add more links as needed */}
    </nav>
  );
};

export default Navbar;
