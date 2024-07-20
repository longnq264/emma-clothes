import { NavLink, useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getUserId } from "../../../api/api-server";

const DropDownProfile = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await getUserId(token);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <li className="px-2 cursor-pointer">
      <span className="font-bold text-stone-800 " onClick={toggleOpen}>
        <LuUser2 size={22} />
      </span>
      {isOpen && (
        <div
          className="absolute right-40 w-48 mt-7 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          {user ? (
            <>
              <div className="border-b border-gray-300 pb-2">
                <h3 className="block px-4 pt-2 text-md font-bold text-gray-700">
                  {user.name}
                  <p className="block text-sm text-gray-500">{user.email}</p>
                </h3>
              </div>
              <div className="py-1" role="none">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </NavLink>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="py-1" role="none">
              <NavLink
                to="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default DropDownProfile;
