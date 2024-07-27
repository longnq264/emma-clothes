import { Carousel } from "antd";
// import banner from "../../../assets/img/banner-homepage.png";
import banner2 from "../../../assets/img/banner-homepage2.png";
import { useEffect, useState } from "react";
import { getBanners } from "../../../api/api-server";
const Banner = () => {
  const [state, setState] = useState([]);
  const getBannerPage = async () => {
    const response = await getBanners();
    console.log(response.data);
    setState(response.data);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  useEffect(() => {
    getBannerPage();
  }, []);
  return (
    <div className="container mx-auto pt-5">
      <Carousel afterChange={onChange}>
        {state.map((data) => (
          <div key={data.id}>
            <img src={banner2} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
