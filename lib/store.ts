import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import authSlice from './features/auth/authSlice';
import { courseApi } from './features/course/courseApi';
import courseSlice from './features/course/courseSlice';
import { exerciseApi } from './features/exercise/exerciseApi';
import { lessonApi } from './features/lesson/lessonApi';
import lessonSlice from './features/lesson/lessonSlice';
import { progressApi } from './features/progress/progressApi';
import progressSlice from './features/progress/progressSlice';
import { progressLEIDApi } from './features/progressLEID/idApi';
import idSlice from './features/progressLEID/idSlice';
import { userApi } from './features/user/userApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      course: courseSlice,
      lesson: lessonSlice,
      progress: progressSlice,
      progressLEID: idSlice,
      [authApi.reducerPath]: authApi.reducer,
      [courseApi.reducerPath]: courseApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [lessonApi.reducerPath]: lessonApi.reducer,
      [exerciseApi.reducerPath]: exerciseApi.reducer,
      [progressApi.reducerPath]: progressApi.reducer,
      [progressLEIDApi.reducerPath]: progressLEIDApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        courseApi.middleware,
        userApi.middleware,
        lessonApi.middleware,
        exerciseApi.middleware,
        progressApi.middleware,
        progressLEIDApi.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
