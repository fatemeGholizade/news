import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INewsApiResponse } from '../types/news';

export const allNewsApi = createApi({
  reducerPath: 'allNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://newsapi.org/v2/' }),
  endpoints: (builder) => ({
    getAllNews: builder.query<INewsApiResponse,  { title:string }>({
      query: ({title}) =>
        `everything?q=${title}&searchIn=title&apiKey=3deed6fe4fa0491281693376d3234bdf`,
    }),
  }),
});

export const { useGetAllNewsQuery } = allNewsApi;
