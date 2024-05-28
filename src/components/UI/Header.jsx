import Navigation from "./Home/Navigation";

const Header = () => {
  return (
    <div className="header px-16 py-6 text-white bg-stone-800">
      <div className="flex justify-between">
        <h1 className="text-3xl text-logo">Emma Clothes</h1>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
