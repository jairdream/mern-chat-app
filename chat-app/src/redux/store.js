import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../core/reducers/userSlice";
import authReducer from "../core/reducers/authSlice";
import messageReducer from "../core/reducers/messageSlice";
import unreadCountReducer from "../core/reducers/unreadCountSlice";
import productReducer from "../core/reducers/productSlice";

const loggerMiddleware = (store) => (next) => (action) => {
  return next(action);
};

const store = configureStore({
  reducer: {
    unreadCount: unreadCountReducer,
    users: userReducer,
    auth: authReducer,
    messages: messageReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;
