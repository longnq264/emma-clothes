import { NavLink } from "react-router-dom";
import collectionImage from "../../../assets/img/collection-sport.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getCategories } from "../../../api/api-server";
import { useState } from "react";
import { useEffect } from "react";

// const initState = [
//   {
//     name: "Emma",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Emma Sport",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Emma Hoodie",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Cargo Pants",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Emma",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Emma Sport",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Emma Hoodie",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
//   {
//     name: "Cargo Pants",
//     image: collectionImage,
//     url: "../../../assets/img/woman-clothing.jpg",
//   },
// ];

const Collection = () => {
  const [categories, setCategories] = useState([]);
  console.log(categories);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      console.log(response.data[0].children[0].children[0].children);
      setCategories(response.data[0].children[0].children[0].children);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="pt-10 pb-20">
      <h1 className="title my-10 font-semibold text-stone-700">
        Bộ Sưu Tập Nổi Bật
      </h1>
      <div className="pl-2 md:px-0 w-full">
        <Swiper
          slidesPerView={5.5}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            // Khi màn hình >= 768px và < 1024px
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
            },
            // Khi màn hình >= 640px và < 768px
            420: {
              slidesPerView: 1.3,
              spaceBetween: 10,
            },
            // Khi màn hình < 640px
            0: {
              slidesPerView: 1.2,
            },
          }}
        >
          {categories.map((data) => (
            <SwiperSlide key={data.id}>
              <NavLink to="/collection/summer">
                <div className="h-80 md:h-full relative">
                  <img
                    src={collectionImage}
                    alt=""
                    className="object-cover w-full max-h-80 "
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
      {/* {initState.map((data, index) => (
            <div className="relative " key={index}>
            <NavLink to="/collection/summer">
            <div className="relative w-60">
            <img src={collectionImage} alt="" className="w-full" />
            <h1 className="absolute bottom-16 left-0 w-full text-white py-2 text-logo text-3xl text-black">
            {data.name}
            </h1>
            </div>
            </NavLink>
            </div>
            ))} */}
      <div className="md:grid grid-cols-4 gap-x-4 text-center"></div>
    </div>
  );
};

export default Collection;
