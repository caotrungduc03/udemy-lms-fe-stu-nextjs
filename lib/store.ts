import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import authSlice from './features/auth/authSlice';
import { courseApi } from './features/course/courseApi';
import courseSlice from './features/course/courseSlice';
import { userApi } from './features/user/userApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      course: courseSlice,
      [authApi.reducerPath]: authApi.reducer,
      [courseApi.reducerPath]: courseApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        courseApi.middleware,
        userApi.middleware,
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
