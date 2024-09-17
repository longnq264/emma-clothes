import PropTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";
import Logo from "./Home/Logo";
const NavMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <>
      <div
        className={`bg-slate-50 fixed top-0 left-0 w-full sm:size-3/4 lg:hidden min-h-screen z-50 ${
          isMenuOpen ? "block" : "hidden"
        } lg:flex flex-col lg:flex-row lg:items-center`}
      >
        {" "}
        <div className="bg-stone-900 py-1 text-center text-sm w-full text-white">
        Chào mừng đến với cửa hàng emma
        </div>
        <div className="flex justify-between px-3 py-2 pb-2 md:pt-0 md:pb-4 border-b">
          <div className="md:h-9">
            <Logo />
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            <IoCloseSharp size={32} />
          </button>
        </div>
      </div>
    </>
  );
};

NavMenu.propTypes = {
  setIsMenuOpen: PropTypes.any,
  isMenuOpen: PropTypes.any,
};

export default NavMenu;
