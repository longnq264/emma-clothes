import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaTag, FaCartPlus, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const NavBar = ({ isOpen, darkMode }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isStaffsOpen, setIsStaffsOpen] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogout = () => {
    // Xóa token hoặc dữ liệu đăng nhập
    localStorage.removeItem('authToken'); 

    // Chuyển hướng đến trang đăng nhập
    navigate('/login'); // Đổi '/login' thành đường dẫn trang đăng nhập của bạn
  };

  return (
    <div className={`relative w-64 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300 ease-in-out ${isOpen ? 'transform-none' : '-translate-x-full'} h-screen flex flex-col`}>
      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-2">
        <NavLink
          to="/admin"
          className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
        >
          <FaTachometerAlt className={`text-2xl mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
          <span className={`text-lg font-medium group-hover:text-white transition-colors duration-300 ${darkMode ? 'group-hover:text-gray-200' : 'group-hover:text-gray-900'}`}>Dashboard</span>
        </NavLink>

        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            <FaBox className={`text-2xl mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
            <span className="flex-1 text-lg font-medium">Products</span>
            {isProductsOpen ? <IoMdArrowDropup className={`ml-auto text-2xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} /> : <IoMdArrowDropdown className={`ml-auto text-2xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />}
          </button>
          <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isProductsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}>
            <NavLink
              to="/admin/products/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-300'}`}
            >
              Add Product
            </NavLink>
            <NavLink
              to="/admin/products"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-300'}`}
            >
              View Products
            </NavLink>
          </div>
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            <FaTag className={`text-2xl mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
            <span className="flex-1 text-lg font-medium">Categories</span>
            {isCategoriesOpen ? <IoMdArrowDropup className={`ml-auto text-2xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} /> : <IoMdArrowDropdown className={`ml-auto text-2xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />}
          </button>
          <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isCategoriesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}>
            <NavLink
              to="/admin/categories/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-300'}`}
            >
              Add Category
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-300'}`}
            >
              View Categories
            </NavLink>
          </div>
        </div>

        {/* Staffs Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsStaffsOpen(!isStaffsOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            <FaUsers className={`text-2xl mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
            <span className="flex-1 text-lg font-medium">Staffs</span>
            {isStaffsOpen ? <IoMdArrowDropup className={`ml-auto text-2xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} /> : <IoMdArrowDropdown className={`ml-auto text-2xl ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />}
          </button>
          <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isStaffsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg`}>
            <NavLink
              to="/admin/staffs/new"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-300'}`}
            >
              Add Staffs
            </NavLink>
            <NavLink
              to="/admin/staffs"
              className={`block px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${darkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-300'}`}
            >
              View Staffs
            </NavLink>
          </div>
        </div>

        {/* Orders và Users */}
        <NavLink
          to="/admin/order"
          className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
        >
          <FaCartPlus className={`text-2xl mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
          <span className={`text-lg font-medium group-hover:text-white transition-colors duration-300 ${darkMode ? 'group-hover:text-gray-200' : 'group-hover:text-gray-900'}`}>Orders</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
        >
          <FaUsers className={`text-2xl mr-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} />
          <span className={`text-lg font-medium group-hover:text-white transition-colors duration-300 ${darkMode ? 'group-hover:text-gray-200' : 'group-hover:text-gray-900'}`}>Users</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`flex items-center px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 ${darkMode ? 'bg-red-700 text-gray-200' : 'bg-red-500 text-gray-900'}`}
      >
        <FaSignOutAlt className={`text-2xl mr-3 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`} />
        <span className={`text-lg font-medium`}>Logout</span>
      </button>
    </div>
  );
};

export default NavBar;
