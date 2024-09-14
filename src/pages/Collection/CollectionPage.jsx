import { NavLink } from "react-router-dom";
import Banner from "../../components/UI/Slider/Banner";
import { Breadcrumb } from "antd";
const CollectionPage = () => {
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
