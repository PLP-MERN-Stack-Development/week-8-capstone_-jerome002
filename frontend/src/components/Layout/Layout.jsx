import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Restaurant System</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/orders" className="text-gray-700 hover:text-blue-600">Orders</Link>
          <Link to="/menu" className="text-gray-700 hover:text-blue-600">Menu</Link>
          <Link to="/tables" className="text-gray-700 hover:text-blue-600">Tables</Link>
          <Link to="/staff" className="text-gray-700 hover:text-blue-600">Staff</Link>

          {!user ? (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
              <Link to="/register" className="text-green-600 hover:underline">Register</Link>
            </>
          ) : (
            <>
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
            </>
          )}
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
