import { createSlice } from '@reduxjs/toolkit';
import { courseApi } from './courseApi';

type CourseState = {
  general: null;
  lessons: any[];
  exercises: any[];
};

const initialState: CourseState = {
  general: null,
  lessons: [],
  exercises: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      courseApi.endpoints.getCourseById.matchFulfilled,
      (state, { payload }) => {
        const { lessons, exercises, ...rest } = payload;
        state.general = rest;
        state.lessons = lessons;
        state.exercises = exercises;
      },
    );
  },
});

export const {} = courseSlice.actions;
export default courseSlice.reducer;
