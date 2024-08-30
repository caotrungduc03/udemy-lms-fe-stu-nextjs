import { createSlice } from '@reduxjs/toolkit';
import { lessonApi } from './lessonApi';

type LessonState = {
  lessonId: number | null;
};

const initialState: LessonState = {
  lessonId: null,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setLessonId: (state, { payload }) => {
      state.lessonId = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      lessonApi.endpoints.getLessonById.matchFulfilled,
      (state, { payload }) => {
        state.lessonId = payload.data.id;
      },
    );
  },
});

export const { setLessonId } = lessonSlice.actions;
export default lessonSlice.reducer;
