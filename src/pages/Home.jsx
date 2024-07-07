// import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Banner from "../components/UI/Home/Banner";
import Collection from "../components/UI/Home/Collection";
import CollectionBanner from "../assets/img/bannercollection.png";
// import CommingSoon from "../assets/img/coming-soon.png";
import FlashSale from "../assets/img/flash-sale.png";
import CategoryPopular from "../components/UI/Home/CategoryPopular";
function HomePage() {
  return (
    <>
      <Banner />
      <div className="container-site my-10">
        <h1 className="title">Home Page</h1>
        <div className="content">
          <p className="text-center">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit...
          </p>
          <p className="text-center">
            There is no one who loves pain itself, who seeks after it and wants
            to have it, simply because it is pain...
          </p>
        </div>
      </div>
      <Collection />
      <div className="container mx-auto py-2">
        <Link>
          <img src={CollectionBanner} alt="" />
        </Link>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4 my-4">
          <Link>
            <img src={FlashSale} alt="" />
          </Link>
          <Link>
            <img src={FlashSale} alt="" />
          </Link>
          <Link>
            <img src={FlashSale} alt="" />
          </Link>
          <Link>
            <img src={FlashSale} alt="" />
          </Link>
        </div>
      </div>
      <CategoryPopular />
    </>
  );
}

export default HomePage;
