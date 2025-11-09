import { configureStore } from "@reduxjs/toolkit";
import salesReducer from "./slices/salesSlice";

const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});

export default store;
