import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className={`min-h-screen mb-4 w-full mt-20 lg:mt-44 lg:pt-1 `}>
      <Outlet />
    </main>
  );
};

export default Layout;
