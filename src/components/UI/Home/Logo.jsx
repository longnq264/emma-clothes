import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo-site md:pr-6">
      <Link to={"/"}>
        <h1 className="text-3xl md:text-5xl text-logo text-sky-800 uppercase">
          Em<span className="text-logo text-amber-600">ma</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
