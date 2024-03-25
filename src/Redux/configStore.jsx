import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import editableTableReducer from "./reducers/editableTableReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    modalReducer: modalReducer,
    editableTableReducer: editableTableReducer
  },
});
