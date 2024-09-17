import { useEffect, useState } from "react";
import ShowMoreBtn from "./ShowMoreBtn";
import { getProductByCategoryId } from "../../../api/api-server";
import { SwiperSlide, Swiper } from "swiper/react";
import ProductItem from "./ProductItem";

const CategoryPopular = () => {
  const categories = [
    { id: 33, name: "Áo polo" },
    { id: 14, name: "Áo khoác" },
    { id: 11, name: "Áo thun" },
    { id: 20, name: "Quần short" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(33);
  const [products, setProducts] = useState([]);
  console.log(products);
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
  }, [selectedCategory]);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4">
          <h1 className="title my-8 lg:my-10 font-semibold text-stone-700">
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
                      : "bg-white text-neutral-500"
                  } rounded-full shadow-md`}
                  onClick={() => setSelectedCategory(data.id)}
                >
                  {data.name}
                </button>
              ))}
            </div>
          </div>
          <ProductItem products={products} />
          <ShowMoreBtn
            props={`/category/${selectedCategory}`}
            color={"bg-white"}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryPopular;
