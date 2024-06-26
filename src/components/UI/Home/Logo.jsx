import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo-site pr-6">
      <Link to={"/"}>
        <h1 className="text-5xl text-logo text-sky-800">
          Em<span className="text-logo text-amber-600">ma</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
