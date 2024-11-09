import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartItems,
  fetchCarts,
  removeCartItem,
  syncLocalCartToServer,
  updateCartQuantity,
} from "./cartThunk";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/indexUtils";
import {
  applyCoupon,
  calculateTotalPrice,
  calculateTotalPriceAll,
  calculateTotalQuantity,
} from "../utils/helperFunction";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalQuantity: calculateTotalQuantity(getCartFromLocalStorage()),
    status: "idle",
    totalPrice: calculateTotalPrice(getCartFromLocalStorage()),
    shippingFee: 20000,
    freeship: 1000000,
    totalPriceApi: 0,
    discount: 0,
    totalPriceAll: 0,
  },

  reducers: {
    addItemToCart(state, action) {
      const { product_id, quantity } = action.payload;

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
        state.items.push(action.payload);
      }

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
          item.quantity = quantity;
        } else if (quantity === 0) {
          // Xóa sản phẩm khỏi giỏ hàng nếu số lượng bằng 0
          state.totalQuantity -= item.quantity;
          state.totalPrice -= item.price * item.quantity;
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalPriceAll = calculateTotalPriceAll(
        state.totalPrice,
        state.shippingFee,
        state.discount
      );
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
    setItems(state, action) {
      state.items = action.payload;
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    setFreeShip(state, action) {
      const progress = action.payload;
      if (progress >= 100) {
        state.shippingFee = 0;
      } else {
        state.shippingFee = 20000;
      }
    },
    setDiscount(state, action) {
      state.discount = action.payload;
    },
    applyCouponTotalPrice(state) {
      state.totalPriceAll = applyCoupon(state.totalPrice, state.discount);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.status = "loading";
      })
      // --------------------- fetch Cart ------------------------------
      .addCase(fetchCarts.fulfilled, (state, action) => {
        const { items, totalPriceApi } = action.payload;
        state.items = items;
        state.totalQuantity = calculateTotalQuantity(state.items);
        state.totalPrice = calculateTotalPrice(state.items);
        state.totalPriceApi = totalPriceApi;
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
        const price = action.payload;
        console.log(price);
        state.items = action.payload;
        state.status = "succeeded";
        state.totalPrice = calculateTotalPrice(getCartFromLocalStorage());
        console.log(state.items);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      // ---------------------- update Cart ----------------------------------
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        // Cập nhật trạng thái giỏ hàng khi cập nhật số lượng thành công
        const updatedItem = action.payload;
        // console.log(updatedItem);
        const existingItem = state.items.find(
          (item) => item.id === updatedItem.id
        );
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
          state.totalQuantity = calculateTotalQuantity(state.items);
          // console.log(state.totalQuantity);
        }
      })
      .addCase(syncLocalCartToServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(syncLocalCartToServer.fulfilled, (state, action) => {
        state.items = action.payload;
        // console.log("payload reducer", action.payload);
        state.totalPrice = calculateTotalPrice(state.items);
        state.totalQuantity = calculateTotalQuantity(action.payload);
        state.status = "succeeded";
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
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

        // update localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      });
  },
});

export const {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  setItems,
  clearCart,
  setFreeShip,
  setDiscount,
  applyCouponTotalPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
