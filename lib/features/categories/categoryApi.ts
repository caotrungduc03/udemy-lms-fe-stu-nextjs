import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<void, void>({
      query: () => {
        return {
          url: `/categories?limit=100`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
