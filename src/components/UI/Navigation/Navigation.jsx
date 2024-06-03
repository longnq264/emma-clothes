import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className="flex">
          <li className="px-4 list">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li className="px-4 list">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Product Us
            </NavLink>
          </li>
          <li className="px-4 list">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Blog
            </NavLink>
          </li>
          <li className="px-4 list">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="px-4 list">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
