import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Nếu bạn đang sử dụng Redux để quản lý trạng thái

const RouteGuard = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store

  if (!user) {
    return <Navigate to="/auth/loginAdmin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-loggedin" />;
  }

  return children;
};

// Thêm PropTypes để kiểm tra props
RouteGuard.propTypes = {
  children: PropTypes.node.isRequired, // `children` là một node React bắt buộc
  allowedRoles: PropTypes.arrayOf(PropTypes.string), // `allowedRoles` là một mảng các chuỗi
};

export default RouteGuard;
