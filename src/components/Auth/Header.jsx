import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container mx-auto px-20 flex justify-between">
      <div className="logo-site pr-6">
        <Link to={"/"}>
          <h1 className="text-5xl text-logo text-white">Emma</h1>
        </Link>
      </div>
    </div>
  );
};

export default Header;
