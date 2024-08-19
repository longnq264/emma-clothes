import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-orange-400 min-h-screen pt-10">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
