import { Link } from "react-router-dom";

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-800 text-white p-4">
    <h2 className="text-2xl font-bold mb-6">Restaurant Admin</h2>
    <ul className="space-y-4">
      <li><Link to="/" className="block hover:underline">Dashboard</Link></li>
      <li><Link to="/menu" className="block hover:underline">Menu</Link></li>
      <li><Link to="/staff" className="block hover:underline">Staff</Link></li>
      <li><Link to="/inventory" className="block hover:underline">Inventory</Link></li>
      <li><Link to="/sales" className="block hover:underline">Sales</Link></li>
      <li><Link to="/users" className="block hover:underline">Users</Link></li>
    </ul>
  </div>
);

export default Sidebar;
