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

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getCourseData: builder.query<Course, string>({
      query: () => ({
        url: '/courses',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCourseDataQuery } = courseApi;
