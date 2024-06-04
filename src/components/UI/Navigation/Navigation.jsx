import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";
import { NAV_LINKS } from "../../../constants";
const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className="flex">
          {NAV_LINKS.map((data, index) => (
            <li key={index} className="px-4 list">
              <NavLink
                to={data.key}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <span className="font-bold">{data.label}</span>
              </NavLink>
            </li>
          ))}
          {/* 
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
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
