import { createSlice } from "@reduxjs/toolkit";
import { fetchCarts } from "./cartThunk";
import { saveCartToLocalStorage } from "../utils/indexUtils";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    isAllSelected: false,
    totalQuantity: 0, // Tổng số lượng sản phẩm
    totalPrice: 0, // Tổng giá trị của giỏ hàng
  },
  reducers: {
    addItemToCart(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.totalQuantity = action.payload.reduce(
          (total, item) => total + item.quantity,
          0
        );
        saveCartToLocalStorage(action.payload);
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
