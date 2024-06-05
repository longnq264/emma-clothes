import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import DetailCarousel from "../../components/UI/Product/DetailCarousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductDetail = () => {
  const { id } = useParams();
  const [state, setState] = useState([]);

  const fetchProductDetail = async () => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);

    setState(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchProductDetail();
  }, []);
  return (
    <div className="relative">
      <div className="container mx-auto absolute">
        <div className="thumbnaill">
          {/* <DetailCarousel listcarousel={state.main_image_url} /> */}
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            ...
          </Swiper>
        </div>
      </div>
      <div className="wrap-detail ">
        <div
          className="content mt-10 container mx-auto px-20"
          style={{ minHeight: "140vh" }}
        >
          <div className="grid grid-cols-2">
            <div className="content-bg pt-80">
              <h1 className="font-bold text-xl">Estimated Delivery</h1>
              <ul>
                <li>Standard (5-11 Business Days)</li>
                <li>Estimated Delivery : Jun 12 - Jun 20</li>
              </ul>
            </div>
            <div className="inner-detail min-h-40 p-5">
              <h1 className="font-bold">{state.name}</h1>
              <div className="price flex">
                <p className="text-xl">{state.price}</p>
                <p className="text-stone-300">{state.price_old}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
