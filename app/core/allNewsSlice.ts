import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsApiResponse } from "app/types/news";

export const allNewsApi = createApi({
  reducerPath: "allNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getAllNews: builder.query<
      NewsApiResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) =>
        `everything?q=bitcoin&page=${page}&pageSize=${pageSize}&apiKey=7197d2699fed4d659b2b5c41fd78702d`,
    }),
  }),
});

export const { useGetAllNewsQuery } = allNewsApi;
