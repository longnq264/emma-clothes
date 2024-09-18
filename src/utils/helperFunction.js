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

export const calculateTotalPriceAll = (totalPrice, shippingFee) => {
  return totalPrice + shippingFee;
};

export const applyCoupon = (totalPrice, discount) => {
  if (discount === 100) {
    return 0;
  }
  // Tính số tiền giảm
  const discountAmount = totalPrice * (discount / 100);

  // Tính tổng tiền sau khi giảm
  const finalPrice = totalPrice - discountAmount;

  return finalPrice >= 0 ? finalPrice : 0;
};
