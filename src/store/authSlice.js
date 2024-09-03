import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, loginUser, registerUser } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    token: localStorage.getItem("token") || null,
    adminToken: localStorage.getItem("adminToken") || null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"; // Khi thunk action bắt đầu chạy
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded"; // Khi thunk action hoàn thành thành công
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"; // Khi thunk action gặp lỗi
        state.error = action.payload;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        console.log(user);
        console.log(token);

        state.status = "succeeded";
        state.user = user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading"; // Khi thunk action bắt đầu chạy
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded"; // Khi thunk action hoàn thành thành công
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed"; // Khi thunk action gặp lỗi
        state.error = action.payload;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
