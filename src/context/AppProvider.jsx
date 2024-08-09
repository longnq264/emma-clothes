import { AppContext } from "./AppContext.jsx";
import { useEffect, useState } from "react";
// import { listCart } from "../api/api-server.js";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const AppProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const [items, setItems] = useState([]);

  // const [totalPrice, setTotalPrice] = useState(0);
  console.log("token", token);

  console.log("state context items:", items);

  const resetCart = () => {
    setItems([]);
    // setTotalQuantity(0);
  };

  // const fetchCartItems = async () => {
  //   if (token) {
  //     try {
  //       const response = await listCart(token);
  //       console.log("fetch Cart", response.items);
  //       setItems(response.items);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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
  // const removeItemFromCart = (itemId) => {
  //   setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  // };

  // handle checkbox item
  // const handleItemChange = (item) => {
  //   setSelectedItems((prevSelectedItems) => {
  //     const isSelected = prevSelectedItems.some(
  //       (selectedItem) => selectedItem.id === item.id
  //     );

  //     if (isSelected) {
  //       return prevSelectedItems.filter(
  //         (selectedItem) => selectedItem.id !== item.id
  //       );
  //     } else {
  //       return [...prevSelectedItems, item];
  //     }
  //   });
  // };

  // // handle checkbox all item
  // const handleSelectAllChange = (isChecked) => {
  //   if (isChecked) {
  //     setSelectedItems(items);
  //   } else {
  //     setSelectedItems([]);
  //   }
  //   setIsAllSelected(isChecked);
  // };

  // useEffect(() => {
  //   const newTotalPrice = selectedItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  //   setTotalPrice(newTotalPrice);

  //   const newTotalQuantity = items.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  //   setTotalQuantity(newTotalQuantity);
  // }, [selectedItems, items]);

  useEffect(() => {
    console.log("Saving items to localStorage:", items);
    localStorage.getItem("cartItems", JSON.stringify(...items));
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
