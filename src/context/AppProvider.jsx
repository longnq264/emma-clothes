import { AppContext } from "./AppContext.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserId, login } from "../api/api-server.js";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // get user
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await getUserId(token);
        setUser(response);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        localStorage.removeItem("token"); // Optional: Remove invalid token
      }
    }
  };

  const loginUser = async (userData) => {
    const response = await login(userData);
    console.log("response login", response.data);
    setUser(response.data);
    localStorage.setItem("token", response.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setItems([]);
    localStorage.removeItem("cartItems");
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

  // handle remove
  const removeItemFromCart = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // handle checkbox item
  const handleItemChange = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.id === item.id
      );

      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  // handle checkbox all item
  const handleSelectAllChange = (isChecked) => {
    if (isChecked) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
    setIsAllSelected(isChecked);
  };

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);

    const newTotalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [selectedItems, items]);

  useEffect(() => {
    console.log("Saving items to localStorage:", items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        items,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        totalQuantity,
        totalPrice,
        selectedItems,
        isAllSelected,
        handleItemChange,
        handleSelectAllChange,
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
