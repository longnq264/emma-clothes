import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NavToggleButton = ({ darkMode, isNavBarOpen, toggleNavBar }) => {
  return (
    <button
      onClick={toggleNavBar}
      className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-200"
      }`}
      aria-label={isNavBarOpen ? "Close Navigation" : "Open Navigation"}
    >
      {isNavBarOpen ? (
        <FaArrowLeft className="text-xl" />
      ) : (
        <FaArrowRight className="text-xl" />
      )}
    </button>
  );
};

export default NavToggleButton;
