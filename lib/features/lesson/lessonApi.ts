import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const lessonApi = createApi({
  reducerPath: 'lessonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getLessonById: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `/lessons/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetLessonByIdQuery } = lessonApi;
