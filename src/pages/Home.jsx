import Banner from "../components/UI/Home/Banner";
import Collection from "../components/UI/Home/Collection";
import CategoryPopular from "../components/UI/Home/CategoryPopular";
import SuggestedProducts from "../components/UI/Home/SuggestedProducts";
// import BannerDesign from "../components/UI/Home/BannerDesign";
import NewCollection from "../components/UI/Home/NewCollection";
import AboutUs from "../components/UI/Home/AboutUs";
import Coupon from "../components/UI/Home/Coupon";

function HomePage() {
  return (
    <div>
      <Banner />
      <Coupon />
      <AboutUs />
      <Collection />
      {/* <BannerDesign /> */}
      <CategoryPopular />
      <NewCollection />
      <SuggestedProducts />
    </div>
  );
}

export default HomePage;
