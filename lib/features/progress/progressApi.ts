import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type getProgressByCourseIdParams = {
  courseId: number;
  accessToken: string | undefined;
};

export const progressApi = createApi({
  reducerPath: 'progressApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getMyCourse: builder.query<any, { accessToken: string | undefined }>({
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
    getCourseAndProgressById: builder.query<any, getProgressByCourseIdParams>({
      async queryFn(
        { courseId, accessToken },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) {
        const [courseResponse, progressResponse] = await Promise.all([
          baseQuery(`/courses/${courseId}`),
          baseQuery({
            url: `/progress/courses/${courseId}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);

        if (courseResponse.error) return { error: courseResponse.error };
        if (progressResponse.error) return { error: progressResponse.error };

        return {
          data: {
            course: courseResponse.data,
            progress: progressResponse.data,
          },
        };
      },
    }),
  }),
});

export const { useGetMyCourseQuery, useGetCourseAndProgressByIdQuery } =
  progressApi;
