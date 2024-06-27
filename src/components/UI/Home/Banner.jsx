import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "antd";

const Banner = () => {
  const [state, setState] = useState([]);

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const getBanner = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/banners");
      console.log("response", response.data.data);
      setState(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log("state", state[0].title);
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <div className="container mx-auto">
      <div className="my-10">
        {/* <h1>Banner</h1> */}
        <Carousel afterChange={onChange}>
          {state.map((res, index) => (
            <div key={index}>
              <h1 style={contentStyle}>{res.title} </h1>
              {/* <img src= alt="" /> */}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
