import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { progressApi } from './progressApi';
interface progress {
  id: number;
}

const initialState = {
  progress: [],
  loading: false,
  error: null as SerializedError | null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearProgress: (state) => {
      state.progress = [];
      state.loading = false;
      state.error = null;
    },
    resetState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        progressApi.endpoints.getProgressData.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.progress = [];
        },
      )
      .addMatcher(
        progressApi.endpoints.getProgressData.matchFulfilled,
        (state, { payload }) => {
          state.progress = payload.data;
          state.loading = false;
          state.error = null;
        },
      )
      .addMatcher(
        progressApi.endpoints.getProgressData.matchRejected,
        (state, { error }) => {
          state.error = error;
          state.loading = false;
        },
      );
  },
});

export const { clearProgress, resetState } = progressSlice.actions;

export default progressSlice.reducer;
