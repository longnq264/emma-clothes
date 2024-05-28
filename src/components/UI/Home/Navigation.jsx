import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className="flex">
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
