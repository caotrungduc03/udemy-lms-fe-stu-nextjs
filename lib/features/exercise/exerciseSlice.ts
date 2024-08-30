import { createSlice } from '@reduxjs/toolkit';
import { exerciseApi } from './exerciseApi';

type ExerciseState = {
  exerciseId: number | null;
};

const initialState: ExerciseState = {
  exerciseId: null,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExerciseId: (state, { payload }) => {
      state.exerciseId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      exerciseApi.endpoints.getExerciseById.matchFulfilled,
      (state, { payload }) => {
        state.exerciseId = payload.id;
      },
    );
  },
});

export const { setExerciseId } = exerciseSlice.actions;
export default exerciseSlice.reducer;
