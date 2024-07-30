import { NavLink } from "react-router-dom";
import CollectionBanner from "../../../assets/img/bannercollection.png";

const BannerDesign = () => {
  return (
    <div className="container mx-auto py-2">
      <NavLink to="/products">
        <img src={CollectionBanner} alt="" />
      </NavLink>
    </div>
  );
};

export default BannerDesign;
