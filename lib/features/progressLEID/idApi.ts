import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const progressLEIDApi = createApi({
  reducerPath: 'progressLEIDApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getProgressLEIDData: builder.query({
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

export const { useGetProgressLEIDDataQuery } = progressLEIDApi;
