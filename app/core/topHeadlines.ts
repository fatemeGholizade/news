import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INewsApiResponse } from '../types/news';

export const topHeadlines = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getNews: builder.query<INewsApiResponse, void>({
      query: () => `top-headlines?country=us&apiKey=3deed6fe4fa0491281693376d3234bdf`,
    }),
  }),
});

export const { useGetNewsQuery } = topHeadlines;
