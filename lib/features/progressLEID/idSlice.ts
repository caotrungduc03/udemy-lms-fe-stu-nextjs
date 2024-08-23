import { createSlice } from '@reduxjs/toolkit';
import { progressLEIDApi } from './idApi';

const initialState = {
  lesson: null,
  exercise: null,
};

const progressLEIDSlice = createSlice({
  name: 'progressLEID',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      progressLEIDApi.endpoints.getProgressLEIDData.matchFulfilled,
      (state, { payload }) => {
        state.lesson = payload.data.progressLessonIds;
        state.exercise = payload.data.progressExerciseIds;
      },
    );
  },
});

export const {} = progressLEIDSlice.actions;

export default progressLEIDSlice.reducer;
