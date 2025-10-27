/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const allBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (BookInfo) => ({
        url: "/api/books",
        method: "POST",
        data: BookInfo,
      }),
    }),

    allBooks: builder.query<any, { page?: number; limit?: number } | void>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/api/books?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateBookMutation, useAllBooksQuery } = allBookApi;
