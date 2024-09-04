import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";

import { filterProduct } from "../../../api/api-server";
import { NavLink } from "react-router-dom";
import ProductImage from "../Product/ProductImage";
import { formatCurrency } from "../../../utils/helperFunction";

import { SwiperSlide, Swiper } from "swiper/react";

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
      <div className="flex flex-col sm:flex-row justify-center items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-600 capitalize mb-4 sm:mb-0">
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
      <div className="hidden sm:block">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 xl:grid-cols-5 lg:gap-4">
          {products.length > 0 ? (
            products.slice(0, 10).map((product) => (
              <NavLink key={product.id} to={`/products/${product.id}`}>
                <div className="relative mb-8 shadow-md">
                  <div className="md:min-h-96">
                    <ProductImage images={product.productImages} />
                  </div>
                  <div className="px-2 pb-4">
                    <h3 className="mt-4 text-base font-semibold text-gray-700 md:h-14 capitalize">
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
      </div>
      <div className="sm:hidden">
        <Swiper
          slidesPerView={3} // Số lượng sản phẩm hiển thị mỗi lần
          spaceBetween={20} // Khoảng cách giữa các slide
          pagination={{ clickable: true }} // Cho phép bấm vào pagination để chuyển slide
          breakpoints={{
            420: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1.2,
            },
          }}
        >
          {products.length > 0 ? (
            products.slice(0, 8).map((product) => (
              <SwiperSlide key={product.id}>
                <NavLink to={`/products/${product.id}`}>
                  <div className="relative mb-8 shadow-md">
                    <div className="md:min-h-96">
                      <ProductImage images={product.productImages} />
                    </div>
                    <div className="px-2 pb-4">
                      <h3 className="mt-4 text-base font-semibold text-gray-700 h-14 capitalize">
                        {product.name}
                      </h3>
                      <p className="pt-2">{formatCurrency(product.price)}</p>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Swiper>
      </div>
      <ShowMoreBtn props={`/category/77`} />
    </div>
  );
};

export default SuggestedProducts;
