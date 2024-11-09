import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className={`min-h-screen mb-4 w-full mt-36 z-10`}>
      <Outlet />
    </main>
  );
};

export default Layout;
