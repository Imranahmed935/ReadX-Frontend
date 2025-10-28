/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const allBookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createBook: builder.mutation({
      query: (bookInfo) => ({
        url: "/api/books",
        method: "POST",
        data: bookInfo,
      }),
      invalidatesTags: ["Books"], 
    }),

    
    allBooks: builder.query<any, { page?: number; limit?: number } | void>({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: `/api/books?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Books"], 
    }),

  
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/api/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"], 
    }),

   updateBook: builder.mutation({
  query: ({ id, data }) => ({
    url: `/api/books/${id}`,
    method: "PUT",
    data, 
  }),
  invalidatesTags: ["Books"], 
}),
  }),

  overrideExisting: false,
});


export const { 
  useCreateBookMutation, 
  useAllBooksQuery, 
  useDeleteBookMutation ,
  useUpdateBookMutation
} = allBookApi;
