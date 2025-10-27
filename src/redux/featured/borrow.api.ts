/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const allBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: (borrowInfo) => ({
        url: "/api/borrow",
        method: "POST",
        data: borrowInfo,
      }),
    }),

 
    allBorrowBooks: builder.query<any, void>({
      query: () => ({
        url: "/api/borrow",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useBorrowBookMutation, useAllBorrowBooksQuery } = allBookApi;
