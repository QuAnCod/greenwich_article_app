import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import closuresReducer from "./reducers/closuresReducer";
import articleReducer from "./reducers/articleReducer";
import academicYearsReducer from "./reducers/academicYearsReducer";
import commentReducer from "./reducers/commentReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    modalReducer: modalReducer,
    articleReducer: articleReducer,
    closuresReducer: closuresReducer,
    academicYearsReducer: academicYearsReducer,
    commentReducer: commentReducer,
  },
});
