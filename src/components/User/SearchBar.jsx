import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form className="relative flex items-center w-full max-w-md">
      <input
        name="search"
        type="text"
        placeholder="Tìm kiếm..."
        className="w-full px-4 py-2 pr-10 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-300 transition-colors duration-300"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300"
      >
        <FaSearch className="text-xl" />
      </button>
    </form>
  );
};

export default SearchBar;

