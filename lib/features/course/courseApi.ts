import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CourseQuery {
  q?: string;
}

type getCourseByIdParams = {
  id: number | string;
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
  }),
});

export const { useGetCourseDataQuery, useGetCourseByIdQuery } = courseApi;
