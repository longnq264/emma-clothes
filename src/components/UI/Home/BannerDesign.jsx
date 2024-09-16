import { NavLink } from "react-router-dom";
import CollectionBanner from "../../../assets/img/bannercollection.png";

const BannerDesign = () => {
  return (
    <div className="hidden lg:block container mx-auto pb-16">
      <NavLink to="/products">
        <img src={CollectionBanner} alt="" />
      </NavLink>
    </div>
  );
};

export default BannerDesign;
