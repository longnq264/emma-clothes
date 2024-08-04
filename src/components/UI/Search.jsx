import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Logo from "../UI/Home/Logo";
const Search = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);
  const handleSearchClick = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          onClick={handleSearchClick}
          type="text"
          className="bg-gray-200 text-black placeholder-gray-400 py-2 rounded-full pl-10 focus:outline-none"
          placeholder="Search"
        />
        <FaSearch
          className="absolute left-3 top-3 text-grey-500"
          color="gray"
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="bg-white container mx-auto">
            <div className="flex justify-between py-4">
              <div className="search-wrap">
                <Logo />
              </div>
              <input
                onChange={handleInputChange}
                type="text"
                className="bg-gray-200 text-black placeholder-gray-400 py-2 rounded-full pl-10 focus:outline-none basis-2/6"
                placeholder="Search"
              />
              <button onClick={handleSearchClick} className="text-black">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
