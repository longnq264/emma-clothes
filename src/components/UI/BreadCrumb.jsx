import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const BreadCrumb = ({ titleName, href }) => {
  return (
    <div className="container mx-auto px-2 md:px-0 md:pt-4">
      <Breadcrumb
        items={[
          {
            title: <NavLink to="/">Trang chủ</NavLink>, // Trang chủ luôn cố định
          },
          {
            title: (
              <NavLink to={href} className="capitalize text-black">
                {titleName}
              </NavLink>
            ),
          },
        ]}
      />
    </div>
  );
};

BreadCrumb.propTypes = {
  titleName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default BreadCrumb;
