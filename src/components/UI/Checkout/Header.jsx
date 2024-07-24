import Logo from "../Home/Logo";
import { PiBag } from "react-icons/pi";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
const Header = () => {
  const { totalQuantity } = useContext(AppContext);
  console.log("total", totalQuantity);
  return (
    <div className="header-checkout">
      <div className="container mx-auto px-40 py-4">
        <div className="flex justify-between">
          <Logo />
          <NavLink to="/cart" className="">
            <span className="font-bold text-stone-800">
              <div className="relative flex items-center">
                <PiBag className="text-black" size={24} />
                {totalQuantity > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
