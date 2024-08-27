import { useEffect, useState } from "react";
import Logo from "./Home/Logo";
import Navigation from "./Navigation/Navigation";
import Search from "./Search";
import DropDownProfile from "./Navigation/DropDownProfile";
import CartQuantity from "./Cart/CartQuantity";
import { GiHamburgerMenu } from "react-icons/gi";
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
    <>
      <header
        className={`bg-slate-50 text-white shadow fixed w-full top-0 left-0 z-50 transition-transform duration-300 ${
          isVisible ? "transform translate-y-0" : "transform -translate-y-full "
        }`}
      >
        <div className="bg-stone-900 py-1 text-center text-sm">
          Get UPTO 40% OFF on your 1st order
        </div>
        <div className="hidden md:block bg-slate-50 py-3 text-center text-xl text-stone-600 border-b">
          Get UPTO 40% OFF on your 1st order
        </div>
        <div className="container mx-auto flex justify-between px-2 lg:px-0">
          <div className="flex items-center min-w-20 lg:hidden">
            <button className="flex items-center text-black">
              <GiHamburgerMenu size={24} />
            </button>
          </div>
          <div className="flex items-center">
            <Logo />
            <Navigation />
          </div>
          <div className="flex">
            <Search />
            <div className="flex items-center">
              <CartQuantity />
              <DropDownProfile />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
