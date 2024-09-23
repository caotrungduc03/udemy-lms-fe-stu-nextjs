import { createSlice } from '@reduxjs/toolkit';
import { progressApi } from './progressApi';

type ProgressState = {
  progressId: number | null;
  lessonIds: number[];
  exerciseIds: number[];
};

const initialState: ProgressState = {
  progressId: null,
  lessonIds: [],
  exerciseIds: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    addExerciseId: (state, { payload }) => {
      if (!state.exerciseIds.includes(payload)) {
        state.exerciseIds = [...state.exerciseIds, payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      progressApi.endpoints.getProgressByCourseId.matchFulfilled,
      (state, { payload }) => {
        state.progressId = payload.data.id;
        state.lessonIds = payload.data.progressLessonIds;
        state.exerciseIds = payload.data.progressExerciseIds;
      },
    );
  },
});

export const { addExerciseId } = progressSlice.actions;
export default progressSlice.reducer;
