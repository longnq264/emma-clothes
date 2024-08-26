import { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaTachometerAlt, FaBox, FaTag, FaUsers } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const NavBar = ({ isOpen, darkMode }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isStaffsOpen, setIsStaffsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
<<<<<<< HEAD

  const baseButtonClass = `flex items-center px-4 py-3 w-full hover:bg-gray-700 transition-colors duration-300`;
  const baseLinkClass = `block px-4 py-3 hover:bg-gray-300 transition-colors duration-300`;

  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const bgColor = darkMode ? "bg-gray-700" : "bg-gray-200";
  const iconColor = darkMode ? "text-indigo-300" : "text-indigo-600";
=======
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); // State for Orders dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
>>>>>>> hieunv3

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 z-40 ${bgColor} ${textColor} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col overflow-y-auto`}
    >
<<<<<<< HEAD
      <nav className="flex-1">
        {/* Dashboard */}
        <NavLink
          to="/admin/"
          className={`${baseButtonClass} ${textColor} hover:bg-gray-600`}
        >
          <FaTachometerAlt className={`text-2xl mr-3 ${iconColor}`} />
          <span className="text-lg font-medium">Dashboard</span>
        </NavLink>

        {/* Products */}
=======
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
>>>>>>> hieunv3
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`${baseButtonClass} ${textColor}`}
          >
            <FaBox className={`text-xl mr-3 ${iconColor}`} />
            <span className="flex-1 text-base font-medium">Products</span>
            {isProductsOpen ? (
              <IoMdArrowDropup className={`ml-auto text-2xl ${iconColor}`} />
            ) : (
              <IoMdArrowDropdown className={`ml-auto text-2xl ${iconColor}`} />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isProductsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${bgColor}`}
          >
            <NavLink to="/admin/products/new" className={baseLinkClass}>
              Add Product
            </NavLink>
            <NavLink to="/admin/products" className={baseLinkClass}>
              View Products
            </NavLink>
          </div>
        </div>

        {/* Categories */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className={`${baseButtonClass} ${textColor}`}
          >
            <FaTag className={`text-2xl mr-3 ${iconColor}`} />
            <span className="flex-1 text-lg font-medium">Categories</span>
            {isCategoriesOpen ? (
              <IoMdArrowDropup className={`ml-auto text-2xl ${iconColor}`} />
            ) : (
              <IoMdArrowDropdown className={`ml-auto text-2xl ${iconColor}`} />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isCategoriesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${bgColor}`}
          >
            <NavLink to="/admin/categories/new" className={baseLinkClass}>
              Add Category
            </NavLink>
            <NavLink to="/admin/categories" className={baseLinkClass}>
              View Categories
            </NavLink>
          </div>
        </div>

        {/* Staffs */}
        <div className="relative">
          <button
            onClick={() => setIsStaffsOpen(!isStaffsOpen)}
            className={`${baseButtonClass} ${textColor}`}
          >
            <FaUsers className={`text-2xl mr-3 ${iconColor}`} />
            <span className="flex-1 text-lg font-medium">Staffs</span>
            {isStaffsOpen ? (
              <IoMdArrowDropup className={`ml-auto text-2xl ${iconColor}`} />
            ) : (
              <IoMdArrowDropdown className={`ml-auto text-2xl ${iconColor}`} />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isStaffsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${bgColor}`}
          >
<<<<<<< HEAD
            <NavLink to="/admin/staffs/new" className={baseLinkClass}>
              Add Staffs
=======
            <NavLink
              to="/admin/staffs/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add Staff
>>>>>>> hieunv3
            </NavLink>
            <NavLink to="/admin/staffs" className={baseLinkClass}>
              View Staffs
            </NavLink>
          </div>
        </div>

<<<<<<< HEAD
        {/* Users */}
=======
        {/* Users Dropdown */}
>>>>>>> hieunv3
        <div className="relative">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className={`${baseButtonClass} ${textColor}`}
          >
            <FaUsers className={`text-2xl mr-3 ${iconColor}`} />
            <span className="flex-1 text-lg font-medium">Users</span>
            {isUsersOpen ? (
              <IoMdArrowDropup className={`ml-auto text-2xl ${iconColor}`} />
            ) : (
              <IoMdArrowDropdown className={`ml-auto text-2xl ${iconColor}`} />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isUsersOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${bgColor}`}
          >
<<<<<<< HEAD
            <NavLink to="/admin/users/new" className={baseLinkClass}>
              Add Users
=======
            <NavLink
              to="/admin/users/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Add User
>>>>>>> hieunv3
            </NavLink>
            <NavLink to="/admin/users" className={baseLinkClass}>
              View Users
            </NavLink>
          </div>
        </div>

<<<<<<< HEAD
        {/* Banner */}
=======
        {/* Banners Dropdown */}
>>>>>>> hieunv3
        <div className="relative">
          <button
            onClick={() => setIsBannerOpen(!isBannerOpen)}
            className={`${baseButtonClass} ${textColor}`}
          >
<<<<<<< HEAD
            <FaUsers className={`text-2xl mr-3 ${iconColor}`} />
            <span className="flex-1 text-lg font-medium">Banner</span>
=======
            <FaTag
              className={`text-2xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-lg font-medium">Banners</span>
>>>>>>> hieunv3
            {isBannerOpen ? (
              <IoMdArrowDropup className={`ml-auto text-2xl ${iconColor}`} />
            ) : (
              <IoMdArrowDropdown className={`ml-auto text-2xl ${iconColor}`} />
            )}
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              isBannerOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${bgColor}`}
          >
            <NavLink to="/admin/banners/new" className={baseLinkClass}>
              Add Banner
            </NavLink>
<<<<<<< HEAD
            <NavLink to="/admin/banners" className={baseLinkClass}>
              View Banner
            </NavLink>
          </div>
        </div>
=======
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

        {/* Logout */}
        <div className="relative">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaSignOutAlt
              className={`text-2xl mr-3 ${
                darkMode ? "text-red-500" : "text-red-600"
              }`}
            />
            <span
              className={`text-base font-medium ${
                darkMode
                  ? "text-gray-200 group-hover:text-white"
                  : "text-gray-800 group-hover:text-gray-900"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
>>>>>>> hieunv3
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default NavBar;
