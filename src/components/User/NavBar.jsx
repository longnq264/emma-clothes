import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaTachometerAlt, FaBox, FaTag, FaUsers } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const NavBar = ({ isOpen, darkMode }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isStaffsOpen, setIsStaffsOpen] = useState(false);

  const baseButtonClass = `flex items-center px-4 py-3 w-full hover:bg-gray-700 transition-colors duration-300`;
  const baseLinkClass = `block px-4 py-3 hover:bg-gray-600 transition-colors duration-300`;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 z-40 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
      } transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col overflow-y-auto`}
    >
      <nav className="flex-1">
        {/* Dashboard */}
        <NavLink
          to=""
          className={`${baseButtonClass} ${
            darkMode
              ? "text-gray-200 hover:bg-gray-600"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          <FaTachometerAlt
            className={`text-2xl mr-3 ${
              darkMode ? "text-indigo-300" : "text-indigo-600"
            }`}
          />
          <span
            className={`text-lg font-medium ${
              darkMode
                ? "group-hover:text-gray-200"
                : "group-hover:text-gray-900"
            }`}
          >
            Dashboard
          </span>
        </NavLink>

        {/* Products */}
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`${baseButtonClass} ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaBox
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-lg font-medium">Products</span>
            {isProductsOpen ? (
              <IoMdArrowDropup
                className={`ml-auto text-2xl ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            ) : (
              <IoMdArrowDropdown
                className={`ml-auto text-2xl ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isProductsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            <NavLink
              to="/admin/products/new"
              className={`${baseLinkClass} ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Product
            </NavLink>
            <NavLink
              to="/admin/products"
              className={`${baseLinkClass} ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Products
            </NavLink>
          </div>
        </div>

        {/* Categories */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className={`${baseButtonClass} ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaTag
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-lg font-medium">Categories</span>
            {isCategoriesOpen ? (
              <IoMdArrowDropup
                className={`ml-auto text-2xl ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            ) : (
              <IoMdArrowDropdown
                className={`ml-auto text-2xl ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isCategoriesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            <NavLink
              to="/admin/categories/new"
              className={`${baseLinkClass} ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Category
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={`${baseLinkClass} ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Categories
            </NavLink>
          </div>
        </div>

        {/* Staffs */}
        <div className="relative">
          <button
            onClick={() => setIsStaffsOpen(!isStaffsOpen)}
            className={`${baseButtonClass} ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaUsers
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-lg font-medium">Staffs</span>
            {isStaffsOpen ? (
              <IoMdArrowDropup
                className={`ml-auto text-2xl ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            ) : (
              <IoMdArrowDropdown
                className={`ml-auto text-2xl ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isStaffsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            <NavLink
              to="/admin/staffs/new"
              className={`${baseLinkClass} ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Staffs
            </NavLink>
            <NavLink
              to="/admin/staffs"
              className={`${baseLinkClass} ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Staffs
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default NavBar;
