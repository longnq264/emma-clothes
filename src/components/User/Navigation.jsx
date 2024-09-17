import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <NavLink to="/">
        <h2 className="text-xl font-semibold">Emma Quản lý</h2>
      </NavLink>
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Đăng xuất
        </button>
      </div>
    </header>
    
  );
};

export default Navigation;
