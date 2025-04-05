import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INewsApiResponse } from '../types/news';

export const newsSlice = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getNews: builder.query<INewsApiResponse, void>({
      query: () => `top-headlines?country=us&apiKey=7197d2699fed4d659b2b5c41fd78702d`,
    }),
  }),
});

export const { useGetNewsQuery } = newsSlice;
