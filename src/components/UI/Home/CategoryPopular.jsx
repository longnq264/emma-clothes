import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ShowMoreBtn from "./ShowMoreBtn";
import { getProductByCategoryId } from "../../../api/api-server";
import ProductImage from "../Product/ProductImage";
import { formatCurrency } from "../../../utils/helperFunction";
import { SwiperSlide, Swiper } from "swiper/react";
// import Swiper from "swiper";

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
      <h1 className="title my-8 lg:my-12 font-semibold text-stone-700">
        Sản phẩm ưa chuộng
      </h1>
      <div className="md:hidden pb-6">
        <Swiper
          className="ml-2"
          slidesPerView="auto"
          // spaceBetween={10}
          breakpoints={{
            768: {
              slidesPerView: 4,
            },
            640: {
              slidesPerView: 4,
            },
            420: {
              slidesPerView: 3.5,
            },
            0: {
              slidesPerView: 2.5,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <button
                className={`px-4 py-2 bg-amber-600 text-black rounded-lg capitalize ${
                  selectedCategory === category.id
                    ? "bg-orange-700 text-white font-bold"
                    : "bg-gray-100 text-neutral-500"
                } rounded-full shadow-sm`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden md:block">
        <div className="flex justify-center flex-wrap mb-16">
          {categories.map((data, index) => (
            <button
              key={index}
              className={`mx-2 px-4 py-2 bg-amber-600 text-black rounded-lg capitalize ${
                selectedCategory === data.id
                  ? "bg-orange-700 text-white font-bold"
                  : "bg-gray-100 text-neutral-500"
              } rounded-full shadow-sm`}
              onClick={() => setSelectedCategory(data.id)}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-6 px-2 md:px-0 pb-6">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="relative shadow-md">
            <NavLink to={`/products/${product.id}`}>
              <ProductImage images={product.productImages} />
              <div className="px-2 md:px-4 pb-4">
                <h2 className="font-semibold mt-4 text-sm xs:h-16 sm:h-16 lg:h-10">
                  {product.name}
                </h2>
                <p className="pt-2">{formatCurrency(product.price)}</p>
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
