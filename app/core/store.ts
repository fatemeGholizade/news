import { configureStore } from '@reduxjs/toolkit';
import { allNewsApi } from './allNewsSlice';
import { topHeadlines } from './topHeadlines';

export const store = configureStore({
  reducer: {
    [allNewsApi.reducerPath]: allNewsApi.reducer,
    [topHeadlines.reducerPath]: topHeadlines.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      allNewsApi.middleware,
      topHeadlines.middleware
    ),
});