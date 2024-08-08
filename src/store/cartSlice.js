import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cartItems") || [],
    isAllSelected: false,
    totalQuantity: 0, // Tổng số lượng sản phẩm
    totalPrice: 0, // Tổng giá trị của giỏ hàng
  },
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      state.totalQuantity += item.quantity;
      state.totalPrice += item.price * item.quantity;
    },

    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items = state.items.filter((i) => i.id !== id);
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
