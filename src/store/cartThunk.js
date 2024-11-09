import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, listCart, removeCart, updateCart } from "../api/api-server";
import { saveCartToLocalStorage } from "../utils/indexUtils";

export const fetchCarts = createAsyncThunk(
  "cart/fetchCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await listCart(token);
      console.log(response);

      if (response.items.length > 0) {
        saveCartToLocalStorage(response.items.products);
      }
      // console.log(response.items);

      return {
        items: response.items,
        totalPriceApi: response.total_amount,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartItems = createAsyncThunk(
  "cart/addToCartItem",
  async ({ values, token, data }, { rejectWithValue }) => {
    try {
      const response = await addToCart(values, token);
      console.log(response);
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
      // console.log(localCart);

      const response = await listCart(token);
      // console.log("syncCartServer", response);

      let serverCart = [];

      if (response.items && Array.isArray(response.items)) {
        serverCart = response.items;
      }

      for (const item of localCart) {
        const existingItem = serverCart.find(
          (serverItem) =>
            serverItem.product_id === item.product_id &&
            serverItem.variant_id === item.variant_id
        );

        if (existingItem) {
          const quantityUpdate = {
            quantity: item.quantity + existingItem.quantity,
          };
          // updat quantity
          await updateCart(existingItem.id, token, quantityUpdate);
        } else {
          // post
          await addToCart(item, token);
        }
      }
      // update cart
      const updatedResponse = await listCart(token);
      // console.log(updatedResponse.items);

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
      // console.log(response);
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
