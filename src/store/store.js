import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: { auth: authSlice, cart: cartSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(thunk),
});

export default store;

// store.dispatch(fetchUser());
