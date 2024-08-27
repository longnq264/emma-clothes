import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";

import { filterProduct } from "../../../api/api-server";
import { NavLink } from "react-router-dom";
import ProductImage from "../Product/ProductImage";
import { formatCurrency } from "../../../utils/helperFunction";

const filters = [
  { value: "popular", name: "San pham pho bien" },
  { value: "created_at", name: "Hàng Mới Về" },
  { value: "discount", name: "Hang khuyen mai" },
];

const SuggestedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(filters[1].value);
  const [products, setProducts] = useState([]);

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
    <div className="container mx-auto py-8 px-2 md:px-0">
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
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-5 lg:gap-4">
        {products.length > 0 ? (
          products.slice(0, 10).map((product) => (
            <NavLink key={product.id} to={`/products/${product.id}`}>
              <div className="relative mb-8 shadow-md">
                <div className="min-h-96">
                  <ProductImage images={product.productImages} />
                </div>
                <div className="px-2 pb-4">
                  <h3 className="mt-4 text-base font-semibold text-gray-700 h-14 capitalize">
                    {product.name}
                  </h3>
                  <p className="pt-2"> {formatCurrency(product.price)}</p>
                </div>
              </div>
            </NavLink>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
      <ShowMoreBtn props={`/category/77`} />
    </div>
  );
};

export default SuggestedProducts;
