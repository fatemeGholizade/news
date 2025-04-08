import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsApiResponse } from "app/types/news";
import { API_KEY } from "app/core/constants";

export const allNewsSlice = createApi({
  reducerPath: "allNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getAllNews: builder.query<
      NewsApiResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) =>
        `everything?q=bitcoin&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`,
    }),
  }),
});

export const { useGetAllNewsQuery } = allNewsSlice;