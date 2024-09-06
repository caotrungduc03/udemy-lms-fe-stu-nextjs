import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnswerSubmission } from './submissionSlice';

type getSubmissionsParams = {
  progressId: number | null;
  exerciseId: number;
  accessToken: string | undefined;
};

type createProgressExerciseParams = {
  progressId: number | null;
  exerciseId: number;
  accessToken: string | undefined;
};

type createSubmissionParams = {
  progressExerciseId: number | null;
  submission: AnswerSubmission[];
  accessToken: string | undefined;
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
            body: { progressId, exerciseId },
          };
        },
        transformResponse: (res: any) => res.data,
      },
    ),
    createSubmission: builder.mutation<any, createSubmissionParams>({
      query: ({ progressExerciseId, submission, accessToken }) => {
        return {
          url: `/submissions`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: { progressExerciseId, submission },
        };
      },
    }),
  }),
});

export const {
  useGetSubmissionsQuery,
  useCreateProgressExerciseMutation,
  useCreateSubmissionMutation,
} = submissionApi;
