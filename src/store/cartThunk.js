import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, listCart, removeCart, updateCart } from "../api/api-server";
import { saveCartToLocalStorage } from "../utils/indexUtils";

export const fetchCarts = createAsyncThunk(
  "cart/fetchCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await listCart(token);

      saveCartToLocalStorage(response.items);
      return response.items;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCartItems = createAsyncThunk(
  "cart/addToCartItem",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      console.log("data", data);
      console.log(token);

      const response = await addToCart(data, token);
      console.log(response);
      return response.data;
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
