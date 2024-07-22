import { createContext } from "react";

export const AppContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  removeItemFromCart: () => {},
});
