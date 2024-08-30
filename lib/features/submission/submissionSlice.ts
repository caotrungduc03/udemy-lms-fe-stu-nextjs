import { createSlice } from '@reduxjs/toolkit';

type Answer = {
  questionId: number;
  answers: string[];
};

type SubmissionState = {
  progressExerciseId: number | null;
  isDoingSubmission: boolean;
  submission: Answer[];
};

const initialState: SubmissionState = {
  progressExerciseId: null,
  isDoingSubmission: false,
  submission: [],
};

const SubmissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setIsDoingSubmission: (state, { payload }) => {
      state.isDoingSubmission = payload;
      state.submission = [];
    },
    setSubmission: (state, { payload }) => {
      state.submission = payload;
    },
  },
});

export const { setIsDoingSubmission, setSubmission } = SubmissionSlice.actions;
export default SubmissionSlice.reducer;
