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
      query: ({ accessToken, courseId }) => {
        return {
          url: `/exercises?courseId=${courseId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
    updateExercise: builder.mutation({
      query: ({ accessToken, data, id }) => ({
        url: `/exercises/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetExerciseByIdQuery,
  useGetExerciseByCourseIdDataQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
} = exerciseApi;
