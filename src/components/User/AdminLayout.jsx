import { NavLink, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Navigation from "./Navigation";

const AdminLayout = () => {
  return (
    <div className="admin-layout bg-stone-100">
      <div className="bg-zinc-800 px-2 py-1">
        <div className="w-10">
          <NavLink to="/" className="text-white">
            emmaclothes.com
          </NavLink>
        </div>
      </div>
      <div className="flex">
        <NavBar className="basis-1/4" />
        <div className="admin-content w-full">
          <Navigation />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
