import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, listCart, removeCart, updateCart } from "../api/api-server";
import { saveCartToLocalStorage } from "../utils/indexUtils";

// Thao tác để lấy giỏ hàng từ server và hợp nhất với localStorage

export const fetchCarts = createAsyncThunk(
  "cart/fetchCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await listCart(token);
      if (response.items.length > 0) {
        saveCartToLocalStorage(response.items.products);
      }
      console.log(response.items);

      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartItems = createAsyncThunk(
  "cart/addToCartItem",
  async ({ values, token, data }, { rejectWithValue }) => {
    try {
      console.log(values);
      console.log("data", data);
      console.log(token);

      const response = await addToCart(values, token);
      console.log(response);
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const syncLocalCartToServer = createAsyncThunk(
  "cart/syncLocalCartToServer",
  async (token, { rejectWithValue }) => {
    try {
      const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log(localCart);

      const response = await listCart(token);
      const serverCart = response.items || [];
      console.log(serverCart);

      // Đưa tất cả các sản phẩm từ localStorage lên server
      for (const item of localCart) {
        console.log(item);

        const existingItem = serverCart.find(
          (serverItem) =>
            serverItem.product_id === item.product_id &&
            serverItem.variant_id === item.variant_id
        );

        console.log(existingItem);

        if (existingItem) {
          console.log(existingItem);

          // Nếu sản phẩm đã tồn tại trên server, cập nhật số lượng
          await updateCart(existingItem.id, token, item.quantity);
        } else {
          // Nếu sản phẩm chưa tồn tại trên server, thêm mới
          await addToCart(item, token);
        }
      }
      // Lấy lại giỏ hàng từ server sau khi cập nhật
      const updatedResponse = await listCart(token);
      console.log(updatedResponse.items);

      return updatedResponse.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ id, token, quantity }, { rejectWithValue }) => {
    const quantityData = { quantity: quantity };
    try {
      const response = await updateCart(id, token, quantityData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, { rejectWithValue, getState }) => {
    const token = getState().auth.token; // Lấy token từ state
    try {
      await removeCart(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
