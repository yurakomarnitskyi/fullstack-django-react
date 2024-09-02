import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorSlices = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => {
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlices.actions;

export const selctErrorMessage = (state) => state.error;

export default errorSlices.reducer;
