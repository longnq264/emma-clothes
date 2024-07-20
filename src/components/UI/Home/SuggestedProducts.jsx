import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";
// import { getProductByCategoryId } from "../../../api/api-server";
import axios from "axios";

const categories = [
  { id: 30, name: "Best Sale" },
  { id: 31, name: "New Arrivals" },
  { id: 32, name: "Big Sale" },
];

const SuggestedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  // console.log(categories[0].id);
  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products?sort_by=created_at`
      );
      console.log("response", response.data);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedCategory);
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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {console.log(category)}
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="relative">
              <h3 className="mt-2 text-lg font-semibold text-gray-700">
                {product.name}
              </h3>
            </div>
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
