import { createSlice } from '@reduxjs/toolkit';
import { progressApi } from './progressApi';
interface Progress {
  id: number;
}

const initialState = {
  progress: null,
  exercise: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        progressApi.endpoints.getProgressData.matchFulfilled,
        (state, { payload }) => {
          state.progress = payload.data;
        },
      )
      .addMatcher(
        progressApi.endpoints.getProgressExercise.matchFulfilled,
        (state, { payload }) => {
          state.exercise = payload.data;
        },
      );
  },
});

export const {} = progressSlice.actions;

export default progressSlice.reducer;
