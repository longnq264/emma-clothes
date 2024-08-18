export const selectTotalQuantity = (state) => state.cart.totalQuantity;

export const calculateTotalQuantity = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};
export const calculateTotalPrice = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const calculateTotalPriceAll = (totalPrice, shippingFee, discount) => {
  return totalPrice + shippingFee - discount;
};
