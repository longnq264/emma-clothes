import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaTachometerAlt,
  FaBox,
  FaTag,
  FaCartPlus,
  FaUsers,
} from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const NavBar = ({ isOpen, darkMode }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  // const [isStaffsOpen, setIsStaffsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  return (
    <div
      className={`fixed top-20 left-0 right-0 w-64 z-40 ${
        darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
      } transition-colors duration-300 ease-in-out ${
        isOpen ? "transform-none" : "-translate-x-full"
      } h-screen flex flex-col`}
    >
      <nav className="flex-1 px-4 py-2 space-y-2">
        {/* Dashboard */}
        <div className="relative">
          <NavLink
            to="/admin"
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
            }`}
          >
            <FaTachometerAlt
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span
              className={`text-base font-medium group-hover:text-white transition-colors duration-300 ${
                darkMode
                  ? "group-hover:text-gray-200"
                  : "group-hover:text-gray-900"
              }`}
            >
              Dashboard
            </span>
          </NavLink>
        </div>

        {/* Orders Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOrdersOpen(!isOrdersOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaCartPlus
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Orders</span>
            {isOrdersOpen ? (
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
              isOrdersOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/orders/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Order
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              List Order
            </NavLink>
          </div>
        </div>

        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaBox
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Products</span>
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
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/products/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Product
            </NavLink>
            <NavLink
              to="/admin/products"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Products
            </NavLink>
          </div>
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
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
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/categories/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Category
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Categories
            </NavLink>
          </div>
        </div>

        {/* Staffs Dropdown */}
        {/* <div className="relative">
          <button
            onClick={() => setIsStaffsOpen(!isStaffsOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
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
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/staffs/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Staff
            </NavLink>
            <NavLink
              to="/admin/staffs"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Staffs
            </NavLink>
          </div>
        </div> */}

        {/* Users Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaUsers
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-lg font-medium">Users</span>
            {isUsersOpen ? (
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
              isUsersOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/users/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add User
            </NavLink>
            <NavLink
              to="/admin/users"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Users
            </NavLink>
          </div>
        </div>

        {/* Banners Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsBannerOpen(!isBannerOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaTag
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-lg font-medium">Banners</span>
            {isBannerOpen ? (
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
              isBannerOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/banners/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Banner
            </NavLink>
            <NavLink
              to="/admin/banners"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              View Banners
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