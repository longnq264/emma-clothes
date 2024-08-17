import { useEffect, useState } from "react";
import Logo from "./Home/Logo";
import Navigation from "./Navigation/Navigation";
import Search from "./Search";
import DropDownProfile from "./Navigation/DropDownProfile";
import CartQuantity from "./Cart/CartQuantity";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        <div className="flex items-center">
          <Logo />
          <Navigation />
        </div>
        <div className="flex">
          <Search />
          <ul className="flex items-center">
            <CartQuantity />
            <DropDownProfile />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
