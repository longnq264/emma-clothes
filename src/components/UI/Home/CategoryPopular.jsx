import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ShowMoreBtn from "./ShowMoreBtn";
import { getProductByCategoryId } from "../../../api/api-server";

const CategoryPopular = () => {
  const categories = [
    { id: 34, name: "Hoodie" },
    { id: 36, name: "Chinos" },
    { id: 37, name: "Jacket" },
    { id: 20, name: "Cargopants" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const response = await getProductByCategoryId(id);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    if (selectedCategory !== null) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="container mx-auto ">
      <h1 className="title my-6 font-semibold text-stone-700">
        Sản phẩm ưa chuộng
      </h1>

      <div className="flex justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-8 py-2 mx-4 bg-amber-600 text-black rounded-lg ${
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
              {product.productImages.map((data) => (
                <div key={data.id}>
                  <img src={data.image_url} alt="" />
                </div>
              ))}
              <h2 className="font-bold mt-2 text-lg">{product.name}</h2>
              <p>{product.price}</p>
            </NavLink>
          </div>
        ))}
      </div>
      <ShowMoreBtn />
    </div>
  );
};

export default CategoryPopular;
