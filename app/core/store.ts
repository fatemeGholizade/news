import { configureStore } from '@reduxjs/toolkit';
import { allNewsApi } from './allNewsSlice';
import { topHeadlines } from './topHeadlines';
import articleReducer from './articleSlice'; 

export const store = configureStore({
  reducer: {
    [allNewsApi.reducerPath]: allNewsApi.reducer,
    [topHeadlines.reducerPath]: topHeadlines.reducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      allNewsApi.middleware,
      topHeadlines.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
