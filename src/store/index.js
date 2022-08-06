import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import cartslice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartslice.reducer,
    ui: uiSlice.reducer,
  },
});
export default store;
