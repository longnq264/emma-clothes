import { NavLink } from "react-router-dom";
import collectionImage from "../../../assets/img/collection-sport.jpg";

const Collection = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="title my-6 font-semibold text-stone-700">
        Popular Collection
      </h1>
      <div className="grid grid-cols-4 gap-x-4 text-center">
        <div className="relative ">
          <NavLink to="/collection/summer">
            <div className="relative">
              <img src={collectionImage} alt="" className="w-full" />
              <h1 className="absolute bottom-16 left-0 w-full text-white py-2 text-logo text-3xl">
                Emma
              </h1>
            </div>
          </NavLink>
        </div>
        <div className="relative">
          <NavLink to="/collection/sport">
            <div className="relative">
              <img src={collectionImage} alt="" className="w-full" />
              <h1 className="absolute bottom-16 left-0 w-full text-white py-2 text-logo text-3xl">
                Emma Sport
              </h1>
            </div>
          </NavLink>
        </div>
        <div className="relative">
          <NavLink to="hoodie">
            <div className="relative">
              <img src={collectionImage} alt="" className="w-full" />
              <h1 className="absolute bottom-16 left-0 w-full text-white py-2 text-logo text-3xl">
                Emma Hoodie
              </h1>
            </div>
          </NavLink>
        </div>
        <div className="relative ">
          <NavLink to="/collection/pants">
            <div className="relative">
              <img src={collectionImage} alt="" className="w-full" />
              <h1 className="absolute bottom-16 left-0 w-full text-white py-2 text-logo text-3xl">
                Cargo Pants
              </h1>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Collection;
