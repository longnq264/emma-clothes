import { NavLink } from "react-router-dom";
import collectionImage from "../../../assets/img/collection-sport.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getCategories } from "../../../api/api-server";
import { useState } from "react";
import { useEffect } from "react";

const Collection = () => {
  const [categories, setCategories] = useState([]);
  console.log(categories);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      console.log(response.data[0].children[0].children[0].children);
      setCategories(response.data[0].children[0].children[1].children);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="md:pt-10 md:pb-20">
      <h1 className="text-start pl-2 md:pl-0 md:text-center title my-10 font-semibold text-stone-700">
        Bộ Sưu Tập Nổi Bật
      </h1>
      <div className="pl-2 sm:pl-4 lg:px-0 w-full">
        <Swiper
          slidesPerView={6}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            1240: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.5,
            },
            420: {
              slidesPerView: 1.3,
              spaceBetween: 10,
            },

            0: {
              slidesPerView: 1.2,
            },
          }}
        >
          {categories.map((data) => (
            <SwiperSlide key={data.id}>
              <NavLink to="/collection/summer">
                <div className="h-80 lg:max-h-80 xl:max-h-96 relative">
                  <img
                    src={collectionImage}
                    alt=""
                    className="object-cover w-full"
                  />
                  <h1 className="absolute bottom-16 left-10 w-full text-white py-2 text-3xl font-bold">
                    {data.name}
                  </h1>
                </div>
              </NavLink>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Collection;
