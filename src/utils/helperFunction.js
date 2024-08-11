export const selectTotalQuantity = (state) => state.cart.totalQuantity;

export const calculateTotalQuantity = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};
export const calculateTotalPrice = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
