import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ShowMoreBtn from "./ShowMoreBtn";
import { getProductByCategoryId } from "../../../api/api-server";
import ProductImage from "../Product/ProductImage";
import { formatCurrency } from "../../../utils/helperFunction";

const CategoryPopular = () => {
  const categories = [
    { id: 33, name: "Áo polo" },
    { id: 14, name: "Áo khoác" },
    { id: 16, name: "Quần jeans" },
    { id: 20, name: "Quần short" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(33);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const response = await getProductByCategoryId(id);
      setProducts(response.data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
    // if (selectedCategory !== null) {
    // }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-4">
      <h1 className="title my-12 font-semibold text-stone-700">
        Sản phẩm ưa chuộng
      </h1>

      <div className="flex justify-center mb-16">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-8 py-2 mx-4 bg-amber-600 text-black rounded-lg capitalize ${
              selectedCategory === category.id
                ? "bg-orange-700 text-white font-bold"
                : "bg-gray-100 text-neutral-500"
            } rounded-full shadow-sm`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="relative">
            <NavLink to={`/products/${product.id}`}>
              <ProductImage images={product.productImages} />
              <div className="px-2">
                <h2 className="font-bold mt-4 text-sm h-14">{product.name}</h2>
                <p className="font-bold">{formatCurrency(product.price)}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <ShowMoreBtn props={`/category/${selectedCategory}`} />
    </div>
  );
};

export default CategoryPopular;
