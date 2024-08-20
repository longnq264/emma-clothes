import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { FaMoon, FaSun } from "react-icons/fa";
import SearchBar from "./SearchBar";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      } transition-colors duration-300 ease-in-out`}
    >
      <header
        className={`fixed top-0 left-0 w-full px-6 py-4 shadow-md border-b z-40  ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-200"
        } transition-colors duration-300 ease-in-out`}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="logo">
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
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <SearchBar />
              </div>
              <button
                onClick={toggleDarkMode}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-200"
                } transition duration-300`}
              >
                {darkMode ? (
                  <FaSun className="text-xl" />
                ) : (
                  <FaMoon className="text-xl" />
                )}
                <span className="ml-2">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
              <button
                onClick={toggleNavBar}
                className={`text-lg font-medium ${
                  darkMode
                    ? "text-gray-200 hover:text-gray-400"
                    : "text-gray-800 hover:text-gray-600"
                } transition duration-300`}
              >
                {isNavBarOpen ? "Ẩn Menu" : "Hiện Menu"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="mt-20 flex flex-1 transition-transform duration-300 ease-in-out">
        <NavBar isOpen={isNavBarOpen} darkMode={darkMode} />
        <main
          className={`flex-1 overflow-y-auto ${isNavBarOpen ? "pl-72" : ""} `}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
