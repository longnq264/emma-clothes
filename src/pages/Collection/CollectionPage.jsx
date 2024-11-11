import { NavLink } from "react-router-dom";
import { Breadcrumb } from "antd";
import Banner from "../../components/UI/Slider/Banner";
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
