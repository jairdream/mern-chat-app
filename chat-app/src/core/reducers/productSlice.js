import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { lists: [], updating: null, histories: [] },
  reducers: {
    CREATE_PRODUCT: (state, action) => {
      state.lists = [...state.lists, action.payload];
    },
    SET_PRODUCT: (state, action) => {
      state.lists = action.payload;
    },
    DELETE_PRODUCT: (state, action) => {
      const { id } = action.payload;
      state.lists = state.lists.filter((product) => product._id != id);
    },
    UPDATING_PRODUCT: (state, action) => {
      for (let product of state.lists) {
        if (product._id == action.payload.id) {
          state.updating = product;
          break;
        }
      }
    },
    SAVE_PRODUCT: (state, action) => {
      state.lists = state.lists.map((product) =>
        product._id == action.payload._id ? action.payload : product
      );
      state.updating = null;
    },
    CANCEL_UPDATE_PRODUCT: (state, action) => {
      state.updating = null;
    },
    SET_HISTORIES: (state, action) => {
      state.histories = action.payload;
    },
    ADD_HISTORIES: (state, action) => {
      state.histories = [...state.histories, action.payload];
    },
  },
});

export const {
  SET_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATING_PRODUCT,
  SAVE_PRODUCT,
  SET_HISTORIES,
  CANCEL_UPDATE_PRODUCT,
  ADD_HISTORIES,
} = productSlice.actions;
export default productSlice.reducer;
