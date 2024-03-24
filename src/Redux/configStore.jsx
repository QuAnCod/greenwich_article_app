import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    modalReducer: modalReducer,
  },
});
