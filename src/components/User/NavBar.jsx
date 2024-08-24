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

  const baseButtonClass = `flex items-center px-4 py-3 w-full hover:bg-gray-700 transition-colors duration-300`;
  const baseLinkClass = `block px-4 py-3 hover:bg-gray-300 transition-colors duration-300`;

  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const bgColor = darkMode ? "bg-gray-700" : "bg-gray-200";
  const iconColor = darkMode ? "text-indigo-300" : "text-indigo-600";

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 z-40 ${bgColor} ${textColor} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col overflow-y-auto`}
    >
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
            <NavLink to="/admin/staffs/new" className={baseLinkClass}>
              Add Staffs
            </NavLink>
            <NavLink to="/admin/staffs" className={baseLinkClass}>
              View Staffs
            </NavLink>
          </div>
        </div>

        {/* Users */}
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
            <NavLink to="/admin/users/new" className={baseLinkClass}>
              Add Users
            </NavLink>
            <NavLink to="/admin/users" className={baseLinkClass}>
              View Users
            </NavLink>
          </div>
        </div>

        {/* Banner */}
        <div className="relative">
          <button
            onClick={() => setIsBannerOpen(!isBannerOpen)}
            className={`${baseButtonClass} ${textColor}`}
          >
            <FaUsers className={`text-2xl mr-3 ${iconColor}`} />
            <span className="flex-1 text-lg font-medium">Banner</span>
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
            <NavLink to="/admin/banners" className={baseLinkClass}>
              View Banner
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
