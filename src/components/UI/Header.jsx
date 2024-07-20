import { useContext, useEffect, useState } from "react";
import Logo from "./Home/Logo";
import Navigation from "./Navigation/Navigation";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { PiBag } from "react-icons/pi";
import { LuUser2 } from "react-icons/lu";
import Search from "./Search";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { items } = useContext(AppContext);
  const cartQuantity = items ? items.length : 0;

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
                    {cartQuantity > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartQuantity}
                      </span>
                    )}
                  </div>
                </span>
              </NavLink>
            </li>
            <li className="px-2">
              <span className="font-bold text-stone-800" onClick={toggleOpen}>
                <LuUser2 size={22} />
              </span>
              {isOpen && (
                <div
                  className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng ký
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                      onClick={() => setIsOpen(false)}
                    >
                      Cài đặt
                    </NavLink>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
