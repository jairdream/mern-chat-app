import { createSlice } from "@reduxjs/toolkit";

const unreadCountSlice = createSlice({
  name: "unreadCount",
  initialState: { count: 0 },
  reducers: {
    SET_COUNT: (state, action) => {
      state.count = action.payload;
    },
    INCREASE_COUNT: (state, action) => {
      state.count += action.payload;
    },
    DECREASE_COUNT: (state, action) => {
      state.count -= action.payload;
      if (state.count < 0) state.count = 0;
    },
    CLEAR_COUNT: (state, action) => {
      state.count = 0;
    },
  },
});

export const { SET_COUNT, CLEAR_COUNT, INCREASE_COUNT, DECREASE_COUNT } =
  unreadCountSlice.actions;
export default unreadCountSlice.reducer;
