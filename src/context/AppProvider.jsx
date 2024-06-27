import { AppContext } from "./context/AppContext.jsx";
import { useState } from "react";

export default function AppProvider({ chidren }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  const handleAddToCart = (data) => {
    setShoppingCart((prevCart) => ({
      // Lấy mảng data trước đó và thêm món hàng mới vào
      items: [...prevCart.items, data],
    }));
  };

  const handleUpdateCartItem = (id, data) => {
    console.log(id, data);
  };
  const handleRemoveCartItem = (id) => {
    console.log(id);
  };
  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddToCart,
    updateItemQuantity: handleUpdateCartItem,
    removeItemFormCart: handleRemoveCartItem,
  };
  //   console.log(chidren);
  return <AppContext.Provider value={ctxValue}>{chidren}</AppContext.Provider>;
}
