import Banner from "../components/UI/Home/Banner";
import Collection from "../components/UI/Home/Collection";
import CategoryPopular from "../components/UI/Home/CategoryPopular";
import SuggestedProducts from "../components/UI/Home/SuggestedProducts";
import FlashSaleCom from "../components/UI/Home/FlashSale";
import BannerDesign from "../components/UI/Home/BannerDesign";
// import Lorem from "../components/UI/Home/Lorem";

function HomePage() {
  return (
    <>
      <Banner />
      {/* <Lorem /> */}
      <Collection />
      <BannerDesign />
      <FlashSaleCom />
      <CategoryPopular />
      <SuggestedProducts />
    </>
  );
}

export default HomePage;
