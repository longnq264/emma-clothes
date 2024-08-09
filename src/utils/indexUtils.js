// cartUtils.js

// Lưu giỏ hàng vào localStorage
export const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Lấy giỏ hàng từ localStorage
export const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
};
