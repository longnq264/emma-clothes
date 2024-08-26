import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaCog,
  FaLifeRing,
} from "react-icons/fa";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeProvider"; // Import hook từ DarkModeProvider

const AdminLayout = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(); // Sử dụng hook
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      localStorage.removeItem("authToken");
      navigate("/auth/loginAdmin");
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      } transition-colors duration-300 ease-in-out`}
    >
      <header
        className={`fixed top-0 left-0 w-full px-6 py-4 shadow-md border-b z-40 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-200"
        } transition-colors duration-300 ease-in-out`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className={`text-3xl font-bold ${
              darkMode
                ? "text-gray-200 hover:text-gray-400"
                : "text-gray-800 hover:text-gray-600"
            } transition duration-300`}
          >
            Emmaclothes
          </NavLink>

          <div className="flex items-center space-x-4">
            <SearchBar />
            <button
              onClick={toggleNotifications}
              className={`relative flex items-center px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-200"
              } transition duration-300`}
            >
              <FaBell className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                3
              </span>
            </button>

            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className={`flex items-center px-4 py-2 ${
                  darkMode
                    ? "text-gray-200 hover:bg-gray-600"
                    : "text-gray-800 hover:bg-gray-200"
                }`}
              >
                <FaUser
                  className={`text-2xl ${
                    darkMode ? "text-indigo-300" : "text-indigo-600"
                  }`}
                />
              </button>
              {showUserMenu && (
                <div
                  className={`absolute right-0 mt-2 w-48 shadow-lg rounded-lg ${
                    darkMode
                      ? "bg-gray-800 text-gray-200"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <NavLink
                    to="/account/settings"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                  >
                    <FaCog className="text-lg" />
                    <span className="ml-2">Account settings</span>
                  </NavLink>

                  <NavLink
                    to="/support"
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                  >
                    <FaLifeRing className="text-lg" />
                    <span className="ml-2">Support</span>
                  </NavLink>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={toggleDarkMode}
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                  >
                    {darkMode ? (
                      <FaSun className="text-lg text-yellow-400" />
                    ) : (
                      <FaMoon className="text-lg text-blue-500" />
                    )}
                    <span className="ml-2">
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                    }`}
                  >
                    <FaSignOutAlt
                      className={`text-lg ${
                        darkMode ? "text-red-300" : "text-red-600"
                      }`}
                    />
                    <span className="ml-2">Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mt-20 flex flex-1 transition-transform duration-300 ease-in-out">
        <NavBar isOpen={isNavBarOpen} darkMode={darkMode} />
        <main
          className={`flex-1 overflow-y-auto ${
            isNavBarOpen ? "pl-64" : ""
          } transition-all duration-300`}
        >
          <br />
          <button
            onClick={toggleNavBar}
            className={`text-lg font-medium py-2 px-4 hover:bg-stone-500 ${
              darkMode
                ? "text-white hover:text-gray-400"
                : "text-stone-700 bg-stone-700"
            } transition duration-300`}
          >
            {isNavBarOpen ? (
              <FaArrowLeft color="white" />
            ) : (
              <FaArrowRight color="white" />
            )}
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
