import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { exerciseApi } from './exerciseApi';
interface Exercise {
  id: number;
}

const initialState = {
  exercises: [],
  loading: false,
  error: null as SerializedError | null,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    clearExercise: (state) => {
      state.exercises = [];
      state.loading = false;
      state.error = null;
    },
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        exerciseApi.endpoints.getExerciseData.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.exercises = []; // Clear courses when a new query starts
        },
      )
      .addMatcher(
        exerciseApi.endpoints.getExerciseData.matchFulfilled,
        (state, { payload }) => {
          state.exercises = payload.data;
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        exerciseApi.endpoints.getExerciseData.matchRejected,
        (state, { error }) => {
          state.error = error;
          state.loading = false;
        },
      );
  },
});

export const { clearExercise, resetState } = exerciseSlice.actions;

export default exerciseSlice.reducer;
