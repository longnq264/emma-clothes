import { Link, Outlet } from "react-router-dom";
// import PropTypes from "prop-types";
const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <main>{<Outlet />}</main>
    </div>
  );
};
// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Layout;
