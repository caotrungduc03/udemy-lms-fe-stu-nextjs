import { createSlice } from '@reduxjs/toolkit';
import { exerciseApi } from './exerciseApi';

type ExerciseState = {
  general: any;
};

const initialState: ExerciseState = {
  general: null,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      exerciseApi.endpoints.getExerciseById.matchFulfilled,
      (state, { payload }) => {
        state.general = payload;
      },
    );
  },
});

export const {} = exerciseSlice.actions;
export default exerciseSlice.reducer;
