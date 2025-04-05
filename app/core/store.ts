// /store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { newsSlice } from "./newsSlice";

export const store = configureStore({
  reducer: {
    [newsSlice.reducerPath]: newsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsSlice.middleware),
});
