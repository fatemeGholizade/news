import { configureStore } from '@reduxjs/toolkit';
import { allNewsApi } from 'app/core/allNewsSlice';
import { topHeadlineSlice } from 'app/core/topHeadlineSlice';

export const store = configureStore({
  reducer: {
    [allNewsApi.reducerPath]: allNewsApi.reducer,
    [topHeadlineSlice.reducerPath]: topHeadlineSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      allNewsApi.middleware,
      topHeadlineSlice.middleware
    ),
});