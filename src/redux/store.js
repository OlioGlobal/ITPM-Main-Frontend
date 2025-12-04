import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import pageReducer from "./slices/pageSlice";
import categoryReducer from "./slices/categorySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: pageReducer,
    categories: categoryReducer,
  },
});
