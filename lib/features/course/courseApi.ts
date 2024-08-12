import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Course {
  id: number;
  createdAt: string;
  courseName: string;
  description: string;
  coverImage: string;
  priceType: string;
  price: number;
}

interface CourseQuery {
  q?: string;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCourseData: builder.query({
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
    getMyCourseData: builder.query<any, { accessToken: string }>({
      query: ({ accessToken }) => {
        return {
          url: `/progress`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const { useGetCourseDataQuery, useGetMyCourseDataQuery } = courseApi;
