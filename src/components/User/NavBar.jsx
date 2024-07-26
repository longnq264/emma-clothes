import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

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
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="w-full px-4 py-2 rounded hover:bg-gray-700 flex justify-between items-center"
          >
            Products
            <svg
              className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${isProductsOpen ? "max-h-40" : "max-h-0"}`}
          >
            <NavLink
              to="/admin/products/add"
              className="block px-4 py-2 bg-gray-700 hover:bg-gray-600"
            >
              Add Product
            </NavLink>
            <NavLink
              to="/admin/products"
              className="block px-4 py-2 bg-gray-700 hover:bg-gray-600"
            >
              View Products
            </NavLink>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="w-full px-4 py-2 rounded hover:bg-gray-700 flex justify-between items-center"
          >
            Categories
            <svg
              className={`w-4 h-4 transition-transform ${isCategoriesOpen ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`transition-all duration-300 overflow-hidden ${isCategoriesOpen ? "max-h-40" : "max-h-0"}`}
          >
            <NavLink
              to="/admin/categories/add"
              className="block px-4 py-2 bg-gray-700 hover:bg-gray-600"
            >
              Add Category
            </NavLink>
            <NavLink
              to="/admin/categories"
              className="block px-4 py-2 bg-gray-700 hover:bg-gray-600"
            >
              View Categories
            </NavLink>
          </div>
        </div>
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
