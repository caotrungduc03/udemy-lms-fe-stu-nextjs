import { createSlice } from '@reduxjs/toolkit';
import { setToken } from '../../tokens';
import { authApi } from './authApi';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.data.accessToken);

          return {
            ...state,
            user: payload.data.user,
          };
        },
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (state, { payload }) => {
          return {
            ...state,
            user: payload.data,
          };
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
