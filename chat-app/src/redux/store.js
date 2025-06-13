import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../core/reducers/userSlice";
import authReducer from "../core/reducers/authSlice";
import messageReducer from "../core/reducers/messageSlice";
import unreadCountReducer from "../core/reducers/unreadCountSlice";
import productReducer from "../core/reducers/productSlice";

const store = configureStore({
  reducer: {
    unreadCount: unreadCountReducer,
    users: userReducer,
    auth: authReducer,
    messages: messageReducer,
    products: productReducer,
  },
});

export default store;
