import { createSlice } from '@reduxjs/toolkit';
import { progressApi } from './progressApi';

type ProgressState = {
  id: number | null;
  lessonIds: number[];
  exerciseIds: number[];
};

const initialState: ProgressState = {
  id: null,
  lessonIds: [],
  exerciseIds: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      progressApi.endpoints.getProgressByCourseId.matchFulfilled,
      (state, { payload }) => {
        state.id = payload.data.id;
        state.lessonIds = payload.data.progressLessonIds;
        state.exerciseIds = payload.data.progressExerciseIds;
      },
    );
  },
});

export const {} = progressSlice.actions;

export default progressSlice.reducer;
