import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsApiResponse } from "app/types/news";
import { API_KEY } from "app/core/constant";

export const topHeadlineSlice = createApi({
  reducerPath: "topHeadlines",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<NewsApiResponse, void>({
      query: () => `top-headlines?country=us&apiKey=${API_KEY}`,
    }),
  }),
});

export const { useGetTopHeadlinesQuery } = topHeadlineSlice;
