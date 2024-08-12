import { createSlice } from "@reduxjs/toolkit";
import { fetchCarts, updateCartQuantity } from "./cartThunk";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/indexUtils";

const calculateTotalQuantity = (items) =>
  items.reduce((total, item) => total + item.quantity, 0);

const calculateTotalPrice = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartFromLocalStorage(),
    isAllSelected: false,
    totalQuantity: 0, // Tổng số lượng sản phẩm
    totalPrice: 0, // Tổng giá trị của giỏ hàng
  },
  reducers: {
    addItemToCart(state, action) {
      const { id, quantity } = action.payload;
      console.log(id);
      console.log(quantity);

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
        state.items = state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        state.items.push(action.payload);
      }

      // Cập nhật tổng số lượng và tổng giá trị
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotalPrice(state.items);

      // Lưu giỏ hàng vào localStorage
      saveCartToLocalStorage(state.items);
    },

    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        if (quantity > 0) {
          state.totalQuantity += quantity - item.quantity;
          state.totalPrice += (quantity - item.quantity) * item.price;
          item.quantity = quantity;
        } else if (quantity === 0) {
          // Xóa sản phẩm khỏi giỏ hàng nếu số lượng bằng 0
          state.totalQuantity -= item.quantity;
          state.totalPrice -= item.price * item.quantity;
          state.items = state.items.filter((i) => i.id !== id);
        }
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
        state.totalQuantity = calculateTotalQuantity(action.payload);
        state.totalPrice = calculateTotalPrice(action.payload);
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        // Cập nhật trạng thái giỏ hàng khi cập nhật số lượng thành công
        const updatedItem = action.payload;
        const existingItem = state.items.find(
          (item) => item.id === updatedItem.id
        );
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
          state.totalQuantity = calculateTotalQuantity(state.items);
          state.totalPrice = calculateTotalPrice(state.items);
        }
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
