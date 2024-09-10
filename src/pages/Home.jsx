import Banner from "../components/UI/Home/Banner";
import Collection from "../components/UI/Home/Collection";
import CategoryPopular from "../components/UI/Home/CategoryPopular";
import SuggestedProducts from "../components/UI/Home/SuggestedProducts";
import BannerDesign from "../components/UI/Home/BannerDesign";
import NewCollection from "../components/UI/Home/NewCollection";
import AboutUs from "../components/UI/Home/AboutUs";
// import FlashSaleCom from "../components/UI/Home/FlashSale";

function HomePage() {
  return (
    <div className="bg-gray-50">
      <Banner />
      <AboutUs />
      <Collection />
      <BannerDesign />
      {/* <FlashSaleCom /> */}
      <CategoryPopular />
      <NewCollection />
      <SuggestedProducts />
    </div>
  );
}

export default HomePage;
