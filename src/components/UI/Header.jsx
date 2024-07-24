import { useContext, useEffect, useState } from "react";
import Logo from "./Home/Logo";
import Navigation from "./Navigation/Navigation";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { PiBag } from "react-icons/pi";
import Search from "./Search";
import DropDownProfile from "./Navigation/DropDownProfile";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { totalQuantity } = useContext(AppContext);
  console.log(totalQuantity);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white text-white border-b shadow fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full "
      }`}
    >
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center	">
          <Logo />
          <Navigation />
        </div>
        <div className="flex">
          <Search />
          <ul className="flex items-center">
            <li className="px-2">
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
            </li>
            <DropDownProfile />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
