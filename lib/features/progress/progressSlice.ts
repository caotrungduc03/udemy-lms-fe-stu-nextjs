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
      progressApi.endpoints.getCourseAndProgressById.matchFulfilled,
      (state, { payload }) => {
        const { id, progressLessonIds, progressExerciseIds } =
          payload.progress.data;
        state.progressId = id;
        state.lessonIds = progressLessonIds;
        state.exerciseIds = progressExerciseIds;
      },
    );
  },
});

export const { addExerciseId } = progressSlice.actions;
export default progressSlice.reducer;
