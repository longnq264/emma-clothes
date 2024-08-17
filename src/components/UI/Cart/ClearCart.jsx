import { NavLink } from "react-router-dom";
import emptyImg from "../../../assets/img/emty.jpg";

const ClearCart = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center my-4">No item in Cart!</h1>
      <div className="w-3/12 container mx-auto">
        <img className="grid place-items-center" src={emptyImg} alt="" />
      </div>
      <div className="grid place-items-center my-10">
        <NavLink to="/products">
          <button className="px-20 py-3 border-2 bg-stone-600 transition-colors duration-300 ease-in-out hover:bg-stone-400 font-bold text-md text-white rounded-md uppercase">
            Shopping now
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default ClearCart;
