import { Carousel } from "antd";
import banner from "../../../assets/img/banner-homepage.png";
import banner2 from "../../../assets/img/banner-homepage2.png";
const Banner = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="container mx-auto pt-5">
      {/* <h1>Banner</h1> */}
      <Carousel afterChange={onChange}>
        <div>
          <img src={banner2} alt="" />
        </div>
        <div>
          <img src={banner} alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
