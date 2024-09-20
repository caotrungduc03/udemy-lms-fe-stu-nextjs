import { createSlice } from '@reduxjs/toolkit';
import { submissionApi } from './submissionApi';

export type AnswerSubmission = {
  questionId: number;
  answers: string[];
};

type SubmissionState = {
  progressExerciseId: number | null;
  tryCount: number | null;
  questions: any[];
  isDoingSubmission: boolean;
};

const initialState: SubmissionState = {
  progressExerciseId: null,
  tryCount: null,
  questions: [],
  isDoingSubmission: false,
};

const SubmissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setProgressExerciseId: (state, { payload }) => {
      state.progressExerciseId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        submissionApi.endpoints.createProgressExercise.matchFulfilled,
        (state, { payload }) => {
          state.progressExerciseId = payload.id;
          state.tryCount = payload.tryCount;
          state.questions = payload.questions;
          state.isDoingSubmission = true;
        },
      )
      .addMatcher(
        submissionApi.endpoints.createSubmission.matchFulfilled,
        (state, { payload }) => {
          state.isDoingSubmission = false;
        },
      );
  },
});

export const { setProgressExerciseId } = SubmissionSlice.actions;
export default SubmissionSlice.reducer;
