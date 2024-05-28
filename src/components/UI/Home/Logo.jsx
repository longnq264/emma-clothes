import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo-site">
      <Link to={"/"}>
        <h1 className="text-3xl text-logo">Emma Clothes</h1>
      </Link>
    </div>
  );
};

export default Logo;
