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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(courseApi.endpoints.getCourseData.matchPending, (state) => {
        state.loading = true;
        state.error = null;
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
      );
  },
});

export default courseSlice.reducer;
