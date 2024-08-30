import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type getSubmissionsParams = {
  progressId: number;
  exerciseId: number;
  accessToken: string;
};

type createProgressExerciseParams = {
  progressId: number;
  exerciseId: number;
  accessToken: string;
};

export const submissionApi = createApi({
  reducerPath: 'submissionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getSubmissions: builder.query<any, getSubmissionsParams>({
      query: ({ progressId, exerciseId, accessToken }) => {
        return {
          url: `/submissions?progressId=${progressId}&exerciseId=${exerciseId}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      transformResponse: (res: any) => res.data,
    }),
    createProgressExercise: builder.mutation<any, createProgressExerciseParams>(
      {
        query: ({ progressId, exerciseId, accessToken }) => {
          return {
            url: `/progress-exercises`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ progressId, exerciseId }),
          };
        },
        transformResponse: (res: any) => res.data,
      },
    ),
  }),
});

export const { useGetSubmissionsQuery, useCreateProgressExerciseMutation } =
  submissionApi;
