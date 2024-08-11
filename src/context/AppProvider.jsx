import { AppContext } from "./AppContext.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { saveCartToLocalStorage } from "../utils/indexUtils.js";

const AppProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const resetCart = () => {
    setItems([]);
  };

  // add
  const addItemToCart = (item, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  // handle update quantity
  const updateItemQuantity = (itemId, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  useEffect(() => {
    saveCartToLocalStorage(items);
  }, [items]);

  return (
    <AppContext.Provider
      value={{
        items,
        setItems,
        addItemToCart,
        updateItemQuantity,
        resetCart,
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
