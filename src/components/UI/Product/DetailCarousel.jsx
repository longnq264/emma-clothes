import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// init Swiper:

const DetailCarousel = (props) => {
  console.log(props);
  const uri = { ...props };
  return (
    <div className="container mx-auto">
      <Swiper
        spaceBetween={50}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide className=" text-center bg-white ">
          <div className="relative w-full">
            <img src={uri.listcarousel} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className=" text-center bg-white ">
          <div className="relative w-full">
            <img src={uri.listcarousel} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className=" text-center bg-white ">
          <div className="relative w-full">
            <img src={uri.listcarousel} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className=" text-center bg-white ">
          <div className="relative w-full">
            <img src={uri.listcarousel} alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className=" text-center bg-white ">
          <div className="relative w-full">
            <img src={uri.listcarousel} alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DetailCarousel;
