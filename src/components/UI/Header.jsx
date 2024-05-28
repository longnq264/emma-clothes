import Logo from "./Home/Logo";
import Navigation from "./Home/Navigation";

const Header = () => {
  return (
    <div className="header px-16 py-6 text-white bg-stone-800">
      <div className="flex justify-between">
        <Logo />
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
