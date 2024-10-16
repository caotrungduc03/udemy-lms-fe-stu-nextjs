import { createSlice } from '@reduxjs/toolkit';
import { progressApi } from '../progress/progressApi';

type CourseState = {
  general: any;
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
      progressApi.endpoints.getCourseAndProgressById.matchFulfilled,
      (state, { payload }) => {
        const { lessons, exercises, ...rest } = payload.course.data;
        state.general = rest;
        state.lessons = lessons;
        state.exercises = exercises;
      },
    );
  },
});

export const {} = courseSlice.actions;
export default courseSlice.reducer;
