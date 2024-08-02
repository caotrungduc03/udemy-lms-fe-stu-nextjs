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

// Thêm interface để xác định các tham số cho query tìm kiếm
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
      query: (queryArg) => {
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
  }),
});

export const { useGetCourseDataQuery } = courseApi;
