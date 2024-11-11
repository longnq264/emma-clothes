import { useEffect, useState } from "react";
import Logo from "./Home/Logo";
import Navigation from "./Navigation/Navigation";
import Search from "./Search";
import DropDownProfile from "./Navigation/DropDownProfile";
import CartQuantity from "./Cart/CartQuantity";
import { RxHamburgerMenu } from "react-icons/rx";

import NavMenu from "./NavMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header
        id="header-container"
        className={`header-site bg-slate-50 text-white shadow fixed w-full top-0 left-0 z-40 transition-transform duration-300 ${
          isVisible ? "transform translate-y-0" : "transform -translate-y-full "
        }`}
      >
        <div className="bg-stone-900 text-center text-sm">
          Giảm giá tới 40% cho đơn hàng đầu tiên của bạn
        </div>
        <div className="bg-slate-50 py-3 text-center lg:text-xl text-stone-600 border-b">
          Chào mừng đến với cửa hàng emma
        </div>
        <div className="px-6 lg:px-20 xl:px-40 flex justify-between items-center">
          <div className="flex items-center min-w-10 sm:min-w-20 lg:hidden">
            <button
              className="flex items-center text-black"
              onClick={toggleMenu}
            >
              <RxHamburgerMenu size={24} />
            </button>
          </div>
          <Logo />
          <Navigation />
          <div className="flex justify-end items-center">
            <Search />
            <CartQuantity />
            {/* <div className="flex items-center">
            </div> */}
            <DropDownProfile />
          </div>
        </div>
      </header>
      <NavMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && (
        <>
          {/* Overlay - Lớp phủ */}
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
            onClick={toggleMenu}
          ></div>
        </>
      )}
    </>
  );
};

export default Header;
