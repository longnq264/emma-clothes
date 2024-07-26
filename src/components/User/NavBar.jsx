import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaTag, FaCartPlus, FaUsers } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const NavBar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className="w-72 h-screen flex flex-col bg-gray-900 text-gray-300 shadow-xl transition-transform duration-300 ease-in-out">

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-2">
        <NavLink
          to="/admin"
          className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group"
        >
          <FaTachometerAlt className="text-2xl text-indigo-500 mr-3" />
          <span className="text-lg font-medium group-hover:text-white transition-colors duration-300">Dashboard</span>
        </NavLink>

        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group"
          >
            <FaBox className="text-2xl text-indigo-500 mr-3" />
            <span className="flex-1 text-lg font-medium">Products</span>
            {isProductsOpen ? <IoMdArrowDropup className="ml-auto text-2xl text-indigo-500" /> : <IoMdArrowDropdown className="ml-auto text-2xl text-indigo-500" />}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isProductsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} bg-gray-800 rounded-lg`}
          >
            <NavLink
              to="/admin/products/new"
              className="block px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Add Product
            </NavLink>
            <NavLink
              to="/admin/products"
              className="block px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              View Products
            </NavLink>
          </div>
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group"
          >
            <FaTag className="text-2xl text-indigo-500 mr-3" />
            <span className="flex-1 text-lg font-medium">Categories</span>
            {isCategoriesOpen ? <IoMdArrowDropup className="ml-auto text-2xl text-indigo-500" /> : <IoMdArrowDropdown className="ml-auto text-2xl text-indigo-500" />}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isCategoriesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} bg-gray-800 rounded-lg`}
          >
            <NavLink
              to="/admin/categories/add"
              className="block px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              Add Category
            </NavLink>
            <NavLink
              to="/admin/categories"
              className="block px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              View Categories
            </NavLink>
          </div>
        </div>

        {/* Orders and Users */}
        <NavLink
          to="/admin/order"
          className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group"
        >
          <FaCartPlus className="text-2xl text-indigo-500 mr-3" />
          <span className="text-lg font-medium group-hover:text-white transition-colors duration-300">Orders</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group"
        >
          <FaUsers className="text-2xl text-indigo-500 mr-3" />
          <span className="text-lg font-medium group-hover:text-white transition-colors duration-300">Users</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
