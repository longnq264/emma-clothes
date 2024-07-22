import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";

import { filterProduct } from "../../../api/api-server";
import { NavLink } from "react-router-dom";

const filters = [
  { value: "popular", name: "New Arrivals" },
  { value: "created_at", name: "Best Sale" },
  { value: "discount", name: "Big Sale" },
];

const SuggestedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(filters[0].value);
  const [products, setProducts] = useState([]);
  console.log("data", products);
  const fetchProductsByCategory = async (value) => {
    try {
      const response = await filterProduct(value);
      console.log("response", response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    console.log("e", e.target.value);
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold text-stone-700 mb-4">
          Product suggestions
        </h2>
        <div className="relative inline-block text-left ml-4">
          <select
            className="border p-2 rounded"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <NavLink key={product.id} to={`/products/${product.id}`}>
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/da7r4robk/image/upload/v1720375784/jacket_tyvg36.png"
                  alt=""
                />
                <h3 className="mt-2 text-lg font-semibold text-gray-700">
                  {product.name}
                </h3>
              </div>
            </NavLink>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <ShowMoreBtn />
    </div>
  );
};

export default SuggestedProducts;
