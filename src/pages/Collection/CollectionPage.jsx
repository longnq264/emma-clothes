import { NavLink } from "react-router-dom";
import Banner from "../../components/UI/Slider/Banner";
import { Breadcrumb } from "antd";
import { useEffect } from "react";
import axios from "axios";
const CollectionPage = () => {
  useEffect(() => {
    console.log("message");
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log("response", response);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="container mx-auto px-2 md:px-0 md:pt-4">
        <Breadcrumb
          items={[
            {
              title: <NavLink to="/">Trang chủ</NavLink>,
            },
            {
              title: (
                <NavLink to="/collection" className="capitalize text-black">
                  Collection
                </NavLink>
              ),
            },
          ]}
        />
      </div>
      <div className="container mx-auto py-4">
        <Banner />
      </div>
    </>
  );
};

export default CollectionPage;
