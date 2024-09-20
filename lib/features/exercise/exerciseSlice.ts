import { createSlice } from '@reduxjs/toolkit';
import { submissionApi } from '../submission/submissionApi';
import { exerciseApi } from './exerciseApi';

type ExerciseState = {
  general: any;
  submissions: any[];
};

const initialState: ExerciseState = {
  general: null,
  submissions: [],
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        exerciseApi.endpoints.getExerciseById.matchFulfilled,
        (state, { payload }) => {
          state.general = payload;
        },
      )
      .addMatcher(
        submissionApi.endpoints.getSubmissions.matchFulfilled,
        (state, { payload }) => {
          state.general = payload.exercise;
          state.submissions = payload.submissions;
        },
      );
  },
});

export const {} = exerciseSlice.actions;
export default exerciseSlice.reducer;
