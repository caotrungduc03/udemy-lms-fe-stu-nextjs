import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const progressApi = createApi({
  reducerPath: 'progressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getProgressData: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `/courses/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    getProgressExercise: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `/progress-exercises/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetProgressDataQuery, useGetProgressExerciseQuery } =
  progressApi;
