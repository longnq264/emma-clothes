import { NavLink } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authSlice";
import { clearCart } from "../../../store/cartSlice";

const DropDownProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  return (
    <div className="px-2 cursor-pointer relative">
      <span
        className="font-bold text-stone-800 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <LuUser2 size={22} />
      </span>
      {isOpen && (
        <>
          <div
            className="absolute right-0 w-60 top-14 origin-top-right bg-white border border-gray-200 rounded shadow-lg ring-1 ring-black ring-opacity-5 z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            {token ? (
              <>
                <div className="border-b border-gray-300 pb-2">
                  <h3 className="block px-4 pt-2 text-md font-bold text-gray-700">
                    {user.name}
                    <p className="block text-sm text-gray-500">{user.email}</p>
                  </h3>
                </div>
                <div className="py-1" role="none">
                  {[
                    { to: "/profile", label: "Hồ sơ" },
                    // { to: "/profile", label: "Cài đặt" },
                  ].map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </>
            ) : (
              <div className="py-1" role="none">
                {[
                  { to: "/auth/login", label: "Đăng nhập" },
                  { to: "/auth/register", label: "Đăng ký" },
                ].map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    tabIndex="-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DropDownProfile;
