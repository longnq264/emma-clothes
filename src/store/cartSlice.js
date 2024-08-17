import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartItems,
  fetchCarts,
  removeCartItem,
  syncLocalCartToServer,
  updateCartQuantity,
} from "./cartThunk";
import {
  // getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/indexUtils";

const calculateTotalQuantity = (items) =>
  items.reduce((total, item) => total + item.quantity, 0);

const calculateTotalPrice = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
    isAllSelected: false,
    // totalQuantity: calculateTotalQuantity(getCartFromLocalStorage()),
    status: "idle",
    totalPrice: 0, // Tổng giá trị của giỏ hàng
    merged: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const { product_id, quantity } = action.payload;
      console.log(action.payload);
      console.log(product_id);
      console.log(quantity);

      const existingItem = state.items.find(
        (item) => item.product_id === product_id
      );

      if (existingItem) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
        state.items = state.items.map((item) =>
          item.product_id === product_id
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
      // --------------------- fetch Cart ------------------------------
      .addCase(fetchCarts.fulfilled, (state, action) => {
        console.log(action.payload);

        state.items = action.payload;
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);
        localStorage.setItem("cartItems", JSON.stringify(state.items));

        state.status = "succeeded";
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCartItems.pending, (state) => {
        state.status = "loading";
      })
      // ------------------- Add To Cart ---------------------
      .addCase(addToCartItems.fulfilled, (state, action) => {
        console.log(action.payload);

        state.items = action.payload;
        state.status = "succeeded";
        console.log(state.items);

        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      // ---------------------- update Cart ----------------------------------
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        // Cập nhật trạng thái giỏ hàng khi cập nhật số lượng thành công
        const updatedItem = action.payload;
        const existingItem = state.items.find(
          (item) => item.id === updatedItem.id
        );
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
          // state.totalQuantity = calculateTotalQuantity(state.items);
          // state.totalPrice = calculateTotalPrice(state.items);
        }
      })
      .addCase(syncLocalCartToServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(syncLocalCartToServer.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log("payload reducer", action.payload);
        state.status = "succeeded";
        localStorage.setItem("cartItems", JSON.stringify(action.payload));

        // state.totalQuantity = calculateTotalQuantity(action.payload.items);
        // state.totalPrice = calculateTotalPrice(action.payload.items);
        // state.merged = true; // Cập nhật trạng thái merged
      })
      .addCase(syncLocalCartToServer.rejected, (state, action) => {
        state.status = "failed";
        console.error("Failed to sync cart:", action.payload);
      })
      // ------------------- Remove Cart -------------------------------
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const removedItemId = action.payload;
        state.items = state.items.filter((item) => item.id !== removedItemId);
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);

        // Cập nhật localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
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
