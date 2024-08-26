import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getExercise: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `/exercises/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      transformResponse: (res: any) => res.data,
    }),
  }),
});

export const { useGetExerciseQuery } = exerciseApi;
