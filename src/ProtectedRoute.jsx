import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./components/User/AdminLayout";

const ProtectedRoute = ({ isAuthenticated }) => {
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/loginAdmin" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};
ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
export default ProtectedRoute;
