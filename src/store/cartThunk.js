import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, listCart } from "../api/api-server";

export const fetchCarts = createAsyncThunk(
  "cart/fetchCart",
  async (token, { rejectWithValue }) => {
    try {
      const response = await listCart(token);
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
      const response = await addToCart(data, token);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
