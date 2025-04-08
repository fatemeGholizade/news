import { configureStore } from "@reduxjs/toolkit";
import { newsSlice } from "app/core/allNewsSlice";

export const store = configureStore({
  reducer: {
    [newsSlice.reducerPath]: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsSlice.middleware),
});
