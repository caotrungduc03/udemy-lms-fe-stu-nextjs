import { createSlice } from '@reduxjs/toolkit';

type LessonState = {
  exerciseId: number | null;
  lessonId: number | null;
};

const initialState: LessonState = {
  exerciseId: null,
  lessonId: null,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setLessonId: (state, { payload }) => {
      state.lessonId = payload;
      state.exerciseId = null;
    },
    setExerciseId: (state, { payload }) => {
      state.exerciseId = payload;
      state.lessonId = null;
    },
  },
});

export const { setLessonId, setExerciseId } = lessonSlice.actions;
export default lessonSlice.reducer;
