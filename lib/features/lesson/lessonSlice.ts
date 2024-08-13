import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { lessonApi } from './lessonApi';

const initialState: {
  currentLesson: any;
  lessons: any;
  loading: boolean;
  error: SerializedError | null;
} = {
  currentLesson: null,
  lessons: null,
  loading: false,
  error: null as SerializedError | null,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    // changeLesson: (state, { payload }) => {
    //   const existingLesson = state.lessons.find(
    //     (lesson) => lesson.id == payload.id,
    //   );

    //   return {
    //     ...state,
    //     currentLesson: existingLesson,
    //   };
    // },
    clearLesson: (state) => {
      state.lessons = [];
      state.loading = false;
      state.error = null;
    },
    resetState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(lessonApi.endpoints.getLessonData.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        state.lessons = []; // Clear courses when a new query starts
      })
      .addMatcher(
        lessonApi.endpoints.getLessonData.matchFulfilled,
        (state, { payload }) => {
          state.lessons = payload.data;
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        lessonApi.endpoints.getLessonData.matchRejected,
        (state, { error }) => {
          state.error = error;
          state.loading = false;
        },
      );
  },
});

export const { clearLesson, resetState } = lessonSlice.actions;

export default lessonSlice.reducer;
