import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserId, login } from "../api/api-server";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      console.log(response);

      return { user: response.data, token: response.token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token) {
      return rejectWithValue("No token available");
    }
    try {
      const response = await getUserId(token);
      console.log("response", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
