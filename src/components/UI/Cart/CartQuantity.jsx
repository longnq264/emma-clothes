import { NavLink } from "react-router-dom";
import { PiBag } from "react-icons/pi";
import { useSelector } from "react-redux";

const CartQuantity = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <div>
      <li className="px-2">
        <NavLink to="/cart" className="">
          <span className="font-bold text-stone-800">
            <div className="relative flex items-center">
              <PiBag className="text-black" size={24} />
              {/* {totalQuantity > 0 && (
                    )} */}
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            </div>
          </span>
        </NavLink>
      </li>
    </div>
  );
};

export default CartQuantity;
