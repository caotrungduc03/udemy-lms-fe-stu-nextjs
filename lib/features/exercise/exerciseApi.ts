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
    getExerciseByCourseIdData: builder.query({
      query: ({ courseId }) => {
        return {
          url: `/exercises?courseId=${courseId}`,
          method: 'GET',
        };
      },
    }),
    createExercise: builder.mutation<any, any>({
      query: ({ data, accessToken }) => ({
        url: '/exercises',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetExerciseByIdQuery,
  useGetExerciseByCourseIdDataQuery,
  useCreateExerciseMutation,
} = exerciseApi;
