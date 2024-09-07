import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const Layout = () => {
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
    <main
      className={`min-h-screen mb-4 w-full  ${
        isVisible ? "mt-20 lg:mt-44 lg:pt-1" : "mt-0 lg:mt-30"
      }`}
    >
      <Outlet />
    </main>
  );
};

export default Layout;
