import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { getBanners } from "../../../api/api-server";
import { Link } from "react-router-dom";
import VideoBanner from "./VideoBanner";

const Banner = () => {
  const [state, setState] = useState([]);
  const getBannerPage = async () => {
    const response = await getBanners();
    setState(response.data);
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    getBannerPage();
  }, []);

  return (
    <div className="box-border">
      <VideoBanner />
      <div className="banner-home md:block">
        <Carousel afterChange={onChange}>
          {state.map((data) => (
            <div key={data.id}>
              <img
                className="w-full"
                src={
                  "https://cdn.wconcept.com/contents/display/category/WUS/A01/contents/2372_27617_14_ENG_20240812175059.gif"
                }
                alt=""
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full bg-stone-100 text-center py-2">
        <p className="">
          Giảm giá tới 40% cho đơn hàng đầu tiên của bạn{" "}
          <Link to="/products">MUA NGAY</Link>
        </p>
      </div>
    </div>
  );
};

export default Banner;
