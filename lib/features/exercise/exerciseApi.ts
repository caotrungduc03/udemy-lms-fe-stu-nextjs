import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type getExerciseByIdParams = {
  id: number;
  accessToken: string | undefined;
};

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getExerciseById: builder.query<any, getExerciseByIdParams>({
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

export const { useGetExerciseByIdQuery } = exerciseApi;
