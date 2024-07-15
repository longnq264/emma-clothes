import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";
import { getProducts } from "../../../api/api-server";
import imageProduct from "../../../assets/img/product1.png";
const SuggestedProducts = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  console.log("data", data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold text-stone-700 mb-4">
          Product suggestions
        </h2>
        <div className="relative inline-block text-left ml-4">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Danh mục
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Hàng mới về
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Ưu đãi
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Hàng bán chạy
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {data.map((product) => (
          <div key={product.id} className="relative">
            <img src={imageProduct} alt={product.name} className="w-full" />
            <h3 className="mt-2 text-lg font-semibold text-gray-700 text-center">
              {product.name}
            </h3>
          </div>
        ))}
      </div>
      <ShowMoreBtn />
    </div>
  );
};

export default SuggestedProducts;
