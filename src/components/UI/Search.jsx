import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          type="text"
          className="bg-gray-200 text-white placeholder-gray-400 py-2 rounded-full pl-10 focus:outline-none"
          placeholder="Search"
        />
        <FaSearch className="absolute left-3 top-3 text-grey-500" />
      </div>
    </div>
  );
};

export default Search;
