// import React from "react";
import PropTypes from "prop-types";
const AdminLayout = ({ children }) => {
  return (
    <div className="">
      {/* <header>Header content goes here</header> */}
      <main>{children}</main>
      {/* <footer>Footer content goes here</footer> */}
    </div>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminLayout;
