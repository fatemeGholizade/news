import { configureStore } from "@reduxjs/toolkit";
import { newsSlice } from "app/core/newsSlice";

export const store = configureStore({
  reducer: {
    [newsSlice.reducerPath]: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsSlice.middleware),
});
