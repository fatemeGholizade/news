import { configureStore } from "@reduxjs/toolkit";
import { allNewsSlice } from "app/core/allNewsSlice";
import { topHeadlineSlice } from "app/core/topHeadlinesSlice";
import articleReducer from "app/core/articleSlice";

export const store = configureStore({
  reducer: {
    [allNewsSlice.reducerPath]: allNewsSlice.reducer,
    [topHeadlineSlice.reducerPath]: topHeadlineSlice.reducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      allNewsSlice.middleware,
      topHeadlineSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
