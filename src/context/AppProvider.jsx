import { AppContext } from "./AppContext.jsx";
import { useState } from "react";
import PropTypes from "prop-types";

const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);
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
