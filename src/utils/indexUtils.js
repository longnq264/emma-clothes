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

export const getAdminLocalStorage = () => {
  const admin = localStorage.getItem("adminToken");

  return admin ? true : false;
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const loadCartFromLocalStorage = () => {
  // Lấy dữ liệu từ localStorage
  const savedCart = localStorage.getItem("cartItems");

  // Kiểm tra xem dữ liệu có tồn tại không
  if (savedCart) {
    try {
      // Chuyển đổi dữ liệu từ JSON sang đối tượng JavaScript
      return JSON.parse(savedCart);
    } catch (error) {
      // Xử lý lỗi nếu dữ liệu không thể phân tích cú pháp
      console.error("Failed to parse cart data from localStorage:", error);
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  }

  // Nếu không có dữ liệu trong localStorage, trả về mảng rỗng
  return [];
};
