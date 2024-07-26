import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
// import Navigation from "./Navigation";
import { FaMoon, FaSun } from "react-icons/fa";

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'} transition-colors duration-300 ease-in-out`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 py-4 shadow-md border-b ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <NavLink to="/" className="text-3xl font-bold hover:text-gray-500 transition duration-300">
          Emmaclothes
        </NavLink>
        <button
          onClick={toggleDarkMode}
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300"
        >
          {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        <NavBar className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} shadow-lg`} />
        <main className="flex-1 p-6">
          {/* <Navigation /> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
