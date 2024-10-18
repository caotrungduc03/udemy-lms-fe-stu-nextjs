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
    getLessonByCourseIdData: builder.query({
      query: ({ accessToken, courseId }) => {
        return {
          url: `/lessons?courseId=${courseId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    createLesson: builder.mutation<any, any>({
      query: ({ data, accessToken }) => ({
        url: '/lessons',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateLesson: builder.mutation({
      query: ({ accessToken, data, id }) => ({
        url: `/lessons/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    deleteLesson: builder.mutation({
      query: ({ accessToken, id }) => ({
        url: `/lessons/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetLessonByIdQuery,
  useGetLessonByCourseIdDataQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
