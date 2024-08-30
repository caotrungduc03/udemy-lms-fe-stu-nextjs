import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import authSlice from './features/auth/authSlice';
import { courseApi } from './features/course/courseApi';
import courseSlice from './features/course/courseSlice';
import { exerciseApi } from './features/exercise/exerciseApi';
import learningSlice from './features/learning/learningSlice';
import { lessonApi } from './features/lesson/lessonApi';
import { progressApi } from './features/progress/progressApi';
import progressSlice from './features/progress/progressSlice';
import { userApi } from './features/user/userApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      course: courseSlice,
      learning: learningSlice,
      progress: progressSlice,
      [authApi.reducerPath]: authApi.reducer,
      [courseApi.reducerPath]: courseApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [lessonApi.reducerPath]: lessonApi.reducer,
      [exerciseApi.reducerPath]: exerciseApi.reducer,
      [progressApi.reducerPath]: progressApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        courseApi.middleware,
        userApi.middleware,
        lessonApi.middleware,
        exerciseApi.middleware,
        progressApi.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
