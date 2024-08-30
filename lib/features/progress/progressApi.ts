import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const progressApi = createApi({
  reducerPath: 'progressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getMyCourse: builder.query<any, { accessToken: string | undefined }>({
      query: ({ accessToken }) => {
        return {
          url: `/progress`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    getProgressByCourseId: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `/progress/courses/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetMyCourseQuery, useGetProgressByCourseIdQuery } =
  progressApi;
