import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CourseQuery {
  q?: string;
}

type getCourseByIdParams = {
  id: number;
};

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCourseData: builder.query<any, any>({
      query: (queryArg: CourseQuery) => {
        const params = new URLSearchParams();
        if (queryArg.q) {
          params.append('q', queryArg.q);
        }
        return {
          url: `/courses/search?${params}`,
          method: 'GET',
        };
      },
    }),
    getCourseById: builder.query<any, getCourseByIdParams>({
      query: ({ id }) => {
        return {
          url: `/courses/${id}`,
          method: 'GET',
        };
      },
      transformResponse: (res: any) => res.data,
    }),
    getCourseByAuthorIdData: builder.query({
      query: ({ id }) => {
        return {
          url: `/courses?authorId=${id}`,
          method: 'GET',
        };
      },
    }),
    createCourse: builder.mutation<any, any>({
      query: ({ data, accessToken }) => ({
        url: '/courses',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    editCourse: builder.mutation<any, any>({
      query: ({ data, id, accessToken }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: data,
      }),
    }),
    getCourseByIdData: builder.query({
      query: ({ id }) => {
        return {
          url: `/courses/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useGetCourseDataQuery,
  useGetCourseByIdQuery,
  useGetCourseByAuthorIdDataQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetCourseByIdDataQuery,
} = courseApi;
