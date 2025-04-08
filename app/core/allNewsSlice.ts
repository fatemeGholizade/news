import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsApiResponse } from "app/types/news";
import { API_KEY } from "app/core/constants";

export const allNewsSlice = createApi({
  reducerPath: "allNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2/" }),
  endpoints: (builder) => ({
    getAllNews: builder.query<
      NewsApiResponse,
      { page?: number | null; pageSize?: null | number; title?: string }
    >({
      query: ({ page, pageSize, title }) => {
        let url = `everything?q=${title}&apiKey=${API_KEY}`;
        // not to send unnecessary params but q without page/pagesize must have a value
        if (page != null) {
          url += `&page=${page}`;
        }

        if (pageSize != null) {
          url += `&pageSize=${pageSize}`;
        }

        return url;
      },
    }),
  }),
});

export const { useGetAllNewsQuery } = allNewsSlice;
