import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
      </div>
      <nav className="flex-1 px-2 space-y-2">
        <NavLink
          to="/admin"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/categories"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
