// /core/allNewsSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INewsApiResponse } from '../types/news';

export const allNewsApi = createApi({
  reducerPath: 'allNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getAllNews: builder.query<INewsApiResponse, void>({
      query: () =>
        `everything?q=bitcoin&apiKey=7197d2699fed4d659b2b5c41fd78702d`,
    }),
  }),
});

export const { useGetAllNewsQuery } = allNewsApi;
