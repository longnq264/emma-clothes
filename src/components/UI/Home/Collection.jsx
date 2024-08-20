import { NavLink } from "react-router-dom";
import collectionImage from "../../../assets/img/collection-sport.jpg";

const initState = [
  {
    name: "Emma",
    image: collectionImage,
    url: "",
  },
  {
    name: "Emma Sport",
    image: collectionImage,
    url: "",
  },
  {
    name: "Emma Hoodie",
    image: collectionImage,
    url: "",
  },
  {
    name: "Cargo Pants",
    image: collectionImage,
    url: "",
  },
];

const Collection = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="title my-10 font-semibold text-stone-700">
        Bộ Sưu Tập Nổi Bật
      </h1>
      <div className="grid grid-cols-4 gap-x-4 text-center">
        {initState.map((data, index) => (
          <div className="relative " key={index}>
            <NavLink to="/collection/summer">
              <div className="relative">
                <img src={collectionImage} alt="" className="w-full" />
                <h1 className="absolute bottom-16 left-0 w-full text-white py-2 text-logo text-3xl">
                  {data.name}
                </h1>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
