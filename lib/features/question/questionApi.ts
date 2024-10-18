import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getQuestionById: builder.query({
      query: ({ id, accessToken }) => {
        return {
          url: `/questions/${id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    createQuestion: builder.mutation<any, any>({
      query: ({ data, accessToken }) => ({
        url: '/questions',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ accessToken, data, id }) => ({
        url: `/questions/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    getQuestionByExerciseId: builder.query({
      query: ({ id, accessToken, limit, sort }) => {
        return {
          url: `/questions?exerciseId=${id}&limit=${limit}&sort=${sort}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    updateQuestionByExerciseId: builder.mutation({
      query: ({ accessToken, data, id }) => ({
        url: `/questions/exercises/${id}`,
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
  useGetQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useUpdateQuestionByExerciseIdMutation,
  useGetQuestionByExerciseIdQuery,
} = questionApi;
