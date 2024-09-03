import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./components/User/AdminLayout";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("adminToken");
  if (!isAuthenticated) {
    return <Navigate to="/auth/loginAdmin" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default ProtectedRoute;
