import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  FaTachometerAlt,
  FaCartArrowDown,
  FaBoxOpen,
  FaTags,
  FaCogs,
  FaUsers,
  FaAd,
  FaSignOutAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const NavBar = ({ isOpen, darkMode }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAttributeOpen, setIsAttributeOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

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
              Bảng điều khiển
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
            <FaCartArrowDown
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Đơn hàng</span>
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
            {/* <NavLink
              to="/admin/orders/new"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm đơn hàng
            </NavLink> */}
            <NavLink
              to="/admin/orders"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Danh sách đơn hàng
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
            <FaBoxOpen
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Sản phẩm</span>
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
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm sản phẩm
            </NavLink>
            <NavLink
              to="/admin/products"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Xem sản phẩm
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
            <FaTags
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Danh mục</span>
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
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm danh mục
            </NavLink>
            <NavLink
              to="/admin/categories"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Danh sách danh mục
            </NavLink>
          </div>
        </div>

        {/* Attributes Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsAttributeOpen(!isAttributeOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaCogs
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Thuộc tính</span>
            {isAttributeOpen ? (
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
              isAttributeOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/attributes/new"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm thuộc tính
            </NavLink>
            <NavLink
              to="/admin/attributes"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Danh sách thuộc tính
            </NavLink>
          </div>
        </div>

                {/* Coupons Dropdown */}
                <div className="relative">
          <button
            onClick={() => setIsCouponsOpen(!isCouponsOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaTicketAlt
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Mã giảm giá</span>
            {isCouponsOpen ? (
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
              isCouponsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`}
          >
            <NavLink
              to="/admin/coupons/new"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm mã giảm giá
            </NavLink>
            <NavLink
              to="/admin/coupons"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Danh sách mã giảm giá
            </NavLink>
          </div>
        </div>

        {/* Users Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaUsers
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Người dùng</span>
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
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm người dùng
            </NavLink>
            <NavLink
              to="/admin/users"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Danh sách người dùng
            </NavLink>
          </div>
        </div>

        {/* Banner Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsBannerOpen(!isBannerOpen)}
            className={`w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 group ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            <FaAd
              className={`text-xl mr-3 ${
                darkMode ? "text-indigo-300" : "text-indigo-600"
              }`}
            />
            <span className="flex-1 text-base font-medium">Quảng cáo</span>
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
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Thêm quảng cáo
            </NavLink>
            <NavLink
              to="/admin/banners"
              className={`block pl-8 pr-4 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-600"
                  : "text-gray-800 hover:bg-gray-300"
              }`}
            >
              Danh sách quảng cáo
            </NavLink>
          </div>
        </div>
      </nav>

      <button
        onClick={handleLogout}
        className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-300 ${
          darkMode ? "text-gray-200 hover:bg-gray-600" : "text-gray-800 hover:bg-gray-300"
        }`}
      >
        <FaSignOutAlt
          className={`text-xl mr-3 ${
            darkMode ? "text-indigo-300" : "text-indigo-600"
          }`}
        />
        <span className="text-base font-medium">Đăng xuất</span>
      </button>
    </div>
  );
};


NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default NavBar;