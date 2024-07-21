import { AppContext } from "./AppContext.jsx";
import { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../api/api-server.js";

const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  const loginUser = async (userData) => {
    const response = await login(userData);
    console.log("response login", response.data);
    setUser(response.data);
    localStorage.setItem("token", response.token); // Lưu token vào localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
  };

  const addItemToCart = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };
  const updateItemQuantity = (itemId, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  const removeItemFromCart = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        user,
        loginUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.any,
};
export default AppProvider;
