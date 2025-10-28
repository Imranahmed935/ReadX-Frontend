/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const allBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE BOOK
    createBook: builder.mutation({
      query: (bookInfo) => ({
        url: "/api/books",
        method: "POST",
        data: bookInfo,
      }),
      invalidatesTags: ["Books"], // ✅ Invalidate Books list
    }),

    // ✅ GET ALL BOOKS
    allBooks: builder.query<any, { page?: number; limit?: number } | void>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/api/books?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Books"], // ✅ Provide Books tag
    }),

    // ✅ DELETE BOOK
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"], // ✅ Invalidate Books list
    }),
  }),

  overrideExisting: false,
});

// ✅ Export hooks
export const { 
  useCreateBookMutation, 
  useAllBooksQuery, 
  useDeleteBookMutation 
} = allBookApi;
