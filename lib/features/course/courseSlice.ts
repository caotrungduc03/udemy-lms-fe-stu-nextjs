import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { courseApi } from './courseApi';

const initialState = {
  courses: [],
  loading: false,
  error: null as SerializedError | null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearCourses(state) {
      state.courses = [];
      state.loading = false;
      state.error = null;
    },
    resetState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(courseApi.endpoints.getCourseData.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        state.courses = []; // Clear courses when a new query starts
      })
      .addMatcher(
        courseApi.endpoints.getCourseData.matchFulfilled,
        (state, { payload }) => {
          state.courses = payload.data.items;
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        courseApi.endpoints.getCourseData.matchRejected,
        (state, { error }) => {
          state.error = error;
          state.loading = false;
        },
      )
      .addMatcher(courseApi.endpoints.getMyCourseData.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        state.courses = []; // Clear courses when a new query starts
      })
      .addMatcher(
        courseApi.endpoints.getMyCourseData.matchFulfilled,
        (state, { payload }) => {
          state.courses = payload.data.items;
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        courseApi.endpoints.getMyCourseData.matchRejected,
        (state, { error }) => {
          state.error = error;
          state.loading = false;
        },
      );
  },
});

export const { clearCourses, resetState } = courseSlice.actions;

export default courseSlice.reducer;
