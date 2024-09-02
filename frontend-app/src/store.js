import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import errorSlices from "./reducers/errorSlices";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    error: errorSlices,
  },
});
