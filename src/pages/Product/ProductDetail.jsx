import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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
    <div className="">
      <div className="">
        <div
          className="content mt-10 container mx-auto px-20"
          style={{ minHeight: "140vh" }}
        >
          <div className="grid grid-cols-2">
            <div className="product-detail-image">
              <div className="product-image">
                <img src={state.main_image_url} alt="" />
              </div>
              <div className="thumbail flex">
                {state.thumbnail_image_url?.map((data, index) => (
                  <div key={index} className="m-4 border-4 p-4">
                    <img src={data} alt="" />
                  </div>
                ))}
              </div>
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
