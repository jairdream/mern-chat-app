import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    detail: {},
    selected: {},
  },
  reducers: {
    SET_AUTH: (state, action) => {
      state.detail = action.payload;
    },
    SELETE_USER: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { SET_AUTH, SELETE_USER } = authSlice.actions;

export default authSlice.reducer;
