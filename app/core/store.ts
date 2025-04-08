import { configureStore } from "@reduxjs/toolkit";
import { allNewsSlice } from "app/core/allNewsSlice";
import { topHeadlineSlice } from "app/core/topHeadlinesSlice";

export const store = configureStore({
  reducer: {
    [allNewsSlice.reducerPath]: allNewsSlice.reducer,
    [topHeadlineSlice.reducerPath]: topHeadlineSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      allNewsSlice.middleware,
      topHeadlineSlice.middleware,
    ),
});
