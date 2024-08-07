import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";

import { filterProduct } from "../../../api/api-server";
import { NavLink } from "react-router-dom";
import ProductImage from "../Product/ProductImage";

const filters = [
  { value: "popular", name: "San pham pho bien" },
  { value: "created_at", name: "Hàng Mới Về" },
  { value: "discount", name: "Hang khuyen mai" },
];

const SuggestedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(filters[1].value);
  const [products, setProducts] = useState([]);
  // console.log("data", products);
  const fetchProductsByCategory = async (value) => {
    try {
      const response = await filterProduct(value);
      // console.log("response", response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error.name);
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
      <div className="flex justify-center items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-600 capitalize">
          Gợi ý sản phẩm
        </h2>
        <div className="relative inline-block text-left ml-4">
          <select
            className="border p-2 rounded capitalize bg-white"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {filters.map((filter) => (
              <option
                key={filter.value}
                value={filter.value}
                className="capitalize"
              >
                {filter.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {products.length > 0 ? (
          products.slice(0, 10).map((product) => (
            <NavLink key={product.id} to={`/products/${product.id}`}>
              <div className="relative">
                <ProductImage images={product.productImages} />
                <h3 className="mt-2 text-lg font-semibold text-gray-700 capitalize">
                  {product.name}
                </h3>
                <p>{product.price}</p>
              </div>
            </NavLink>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <ShowMoreBtn props={`/collection/Hang Moi Ve`} />
    </div>
  );
};

export default SuggestedProducts;
