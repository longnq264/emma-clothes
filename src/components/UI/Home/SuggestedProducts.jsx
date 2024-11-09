import { useEffect, useState } from "react";
import { filterProduct } from "../../../api/api-server";
import ShowMoreBtn from "./ShowMoreBtn";
import ProductItem from "./ProductItem";

const SuggestedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async (value) => {
      try {
        const response = await filterProduct(value);
        console.log("response", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchProductsByCategory("created_at");
  }, []);

  return (
    <div className="container mx-auto py-8 px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-600 capitalize mb-4 sm:mb-0">
          Gợi ý sản phẩm
        </h2>
      </div>

      <ProductItem products={products} />
      <ShowMoreBtn props={`/category/created_at`} color={"bg-stone-100"} />
    </div>
  );
};

export default SuggestedProducts;
