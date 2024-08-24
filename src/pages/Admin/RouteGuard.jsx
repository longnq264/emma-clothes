import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage
    const token = localStorage.getItem("token"); // Kiểm tra token
  
    if (!token) {
      return <Navigate to="/auth/loginAdmin" />;
    }
  
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
      return <Navigate to="/not-loggedin" />;
    }
  
    return children;
  };
  

RouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default RouteGuard;
